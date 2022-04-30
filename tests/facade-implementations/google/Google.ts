/* eslint-disable @skylib/consistent-filename -- Ok */

import { implementations } from "@";
import { as, assert, AssertionError, fn } from "@skylib/functions";
import $ from "jquery";
import type { stringU, unknowns } from "@skylib/functions";

const { Google } = implementations.google;

const getScript = jest
  .spyOn($, "getScript")
  .mockImplementation((...args: unknowns) => {
    assert.toBeTrue(args.length === 1);
    assert.toBeTrue(args[0] === "https://apis.google.com/js/api:client.js");

    return {} as JQuery.jqXHR<stringU>;
  });

globalThis.gapi = fn.run(() => {
  return {
    auth2: {
      init(params) {
        const clientId = params.client_id;

        const user = {
          getAuthResponse() {
            return { id_token: as.not.empty(clientId) };
          }
        } as gapi.auth2.GoogleUser;

        return {
          then(
            onInit: (googleAuth: gapi.auth2.GoogleAuthBase) => void,
            onFailure: (reason: Reason) => void
          ): void {
            if (clientId === "init_error")
              onFailure({ details: "Init error", error: "init_error" });
            else
              onInit({
                currentUser: {
                  get() {
                    return user;
                  }
                },
                isSignedIn: {
                  get() {
                    return clientId === "signedIn";
                  }
                },
                async signIn() {
                  await Promise.resolve();

                  switch (clientId) {
                    case "popup_closed_by_user":
                      throw {
                        details: "Popup closed by user",
                        error: "popup_closed_by_user"
                      };

                    case "unknown_error":
                      throw new Error("Unknown error");

                    default:
                      return user;
                  }
                }
              } as gapi.auth2.GoogleAuthBase);
          }
        };
      }
    },
    load(apiName, callback) {
      assert.toBeTrue(apiName === "auth2");
      assert.callable(callback);
      callback();
    }
  } as typeof gapi;

  interface Reason {
    details: string;
    error: string;
  }
});

test("Google.idToken", async () => {
  const google = new Google(undefined);

  const error = new AssertionError("Missing Google client ID");

  await expect(google.idToken()).rejects.toStrictEqual(error);
});

test("Google.idToken: init_error", async () => {
  const clientId = "init_error";

  const google = new Google(clientId);

  const error = new Error("Error init_error: Init error");

  await expect(google.idToken()).rejects.toStrictEqual(error);
});

test("Google.idToken: popup_closed_by_user", async () => {
  const clientId = "popup_closed_by_user";

  const google = new Google(clientId);

  await expect(google.idToken()).resolves.toBeUndefined();
});

test("Google.idToken: signIn", async () => {
  const clientId = "signIn";

  const google = new Google(clientId);

  await expect(google.idToken()).resolves.toStrictEqual(clientId);
});

test("Google.idToken: signedIn", async () => {
  const clientId = "signedIn";

  const google = new Google(clientId);

  await expect(google.idToken()).resolves.toStrictEqual(clientId);
});

test("Google.idToken: unknown_error", async () => {
  const clientId = "unknown_error";

  const google = new Google(clientId);

  const error = new Error("Unknown error");

  await expect(google.idToken()).rejects.toStrictEqual(error);
});

test("Google.loadSdk", async () => {
  const google = new Google(clientId);

  expect(getScript).not.toHaveBeenCalled();
  await google.loadSdk();
  expect(getScript).toHaveBeenCalledTimes(1);
  await google.loadSdk();
  expect(getScript).toHaveBeenCalledTimes(1);

  async function clientId(): Promise<stringU> {
    await Promise.resolve();

    return "signedIn";
  }
});
