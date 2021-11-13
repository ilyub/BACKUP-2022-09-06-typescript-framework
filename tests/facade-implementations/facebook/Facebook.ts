/**
 * @jest-environment @skylib/config/src/jest-env-jsdom
 */
import $ from "jquery";

import { facebook } from "@skylib/facades/dist/facebook";
import * as assert from "@skylib/functions/dist/assertions";
import { AssertionError } from "@skylib/functions/dist/errors/AssertionError";
import type { stringU } from "@skylib/functions/dist/types/core";

import { Facebook } from "@/facade-implementations/facebook/Facebook";

const getScript = jest
  .spyOn($, "getScript")
  .mockImplementation((...args: unknown[]) => {
    assert.toBeTrue(args.length === 1);
    assert.toBeTrue(args[0] === "https://connect.facebook.net/en_US/sdk.js");

    let appId: stringU = undefined;

    globalThis.FB = {
      getAuthResponse() {
        return appId === "loggedIn" ? getAuthResponse(appId) : null;
      },
      init(params) {
        appId = params.appId;
      },
      login(callback: (response: fb.StatusResponse) => void) {
        callback({
          authResponse: getAuthResponse(appId),
          status: getLoginStatus(appId)
        });
      }
    } as fb.FacebookStatic;

    return {} as JQuery.jqXHR<stringU>;
  });

function getAuthResponse(appId: stringU): fb.AuthResponse {
  assert.not.empty(appId);

  return {
    accessToken: `access-token-${appId}`,
    expiresIn: 3600,
    signedRequest: "signed-request",
    userID: "user-id"
  };
}

function getLoginStatus(appId: stringU): fb.LoginStatus {
  switch (appId) {
    case "login-authorization_expired":
      return "authorization_expired";

    case "login-connected":
      return "connected";

    case "login-not_authorized":
      return "not_authorized";

    case "login-unknown":
      return "unknown";

    default:
      throw new Error("Unexpected app ID");
  }
}

it("Facebook.accessToken", async () => {
  const error = new AssertionError("Missing Facebook app ID");

  await expect(facebook.accessToken()).rejects.toStrictEqual(error);
});

it("Facebook.accessToken: loggedIn", async () => {
  const appId = "loggedIn";

  const accessToken = `access-token-${appId}`;

  facebook.setImplementation(new Facebook(appId, "10.0"));
  await expect(facebook.accessToken()).resolves.toStrictEqual(accessToken);
});

it("Facebook.accessToken: login-authorization_expired", async () => {
  const appId = "login-authorization_expired";

  const error = new Error("Facebook login failed (authorization_expired)");

  facebook.setImplementation(new Facebook(appId, "10.0"));
  await expect(facebook.accessToken()).rejects.toStrictEqual(error);
});

it("Facebook.accessToken: login-connected", async () => {
  const appId = "login-connected";

  const accessToken = `access-token-${appId}`;

  facebook.setImplementation(new Facebook(appId, "10.0"));
  await expect(facebook.accessToken()).resolves.toStrictEqual(accessToken);
});

it("Facebook.accessToken: login-not_authorized", async () => {
  const appId = "login-not_authorized";

  facebook.setImplementation(new Facebook(appId, "10.0"));
  await expect(facebook.accessToken()).resolves.toBeUndefined();
});

it("Facebook.accessToken: login-unknown", async () => {
  const appId = "login-unknown";

  const error = new Error("Facebook login failed (unknown)");

  facebook.setImplementation(new Facebook(appId, "10.0"));
  await expect(facebook.accessToken()).rejects.toStrictEqual(error);
});

it("Facebook.loadSdk", async () => {
  facebook.setImplementation(new Facebook(appId, "10.0"));

  {
    expect(getScript).not.toBeCalled();
    await facebook.loadSdk();
    expect(getScript).toBeCalledTimes(1);
  }

  {
    await facebook.loadSdk();
    expect(getScript).toBeCalledTimes(1);
  }

  async function appId(): Promise<stringU> {
    await Promise.resolve();

    return "loggedIn";
  }
});
