/* eslint jest/max-expects: [warn, { max: 3 }] -- Ok */
/* eslint-disable @typescript-eslint/no-throw-literal -- Ok */
/* eslint-disable etc/throw-error -- Ok */
/* eslint-disable unicorn/no-thenable -- Ok */

import { AssertionError, as, assert, evaluate } from "@skylib/functions";
import type { stringU, unknowns } from "@skylib/functions";
import $ from "jquery";
import { implementations } from "@";

const { Google } = implementations.google;

const getScript = jest
  .spyOn($, "getScript")
  .mockImplementation((...args: unknowns) => {
    assert.toBeTrue(
      args.length === 1 &&
        args[0] === "https://apis.google.com/js/api:client.js",
      "Invalid args"
    );

    return {} as JQuery.jqXHR<stringU>;
  });

globalThis.gapi = evaluate(() => {
  return {
    auth2: {
      init: (params): gapi.auth2.GoogleAuth => {
        const clientId = params.client_id;

        const user = {
          getAuthResponse: (): gapi.auth2.AuthResponse =>
            ({ id_token: as.not.empty(clientId) } as gapi.auth2.AuthResponse)
        } as gapi.auth2.GoogleUser;

        return {
          then: (
            onInit: (googleAuth: gapi.auth2.GoogleAuthBase) => void,
            onFailure: (reason: Reason) => void
          ) => {
            if (clientId === "init_error")
              onFailure({ details: "Init error", error: "init_error" });
            else
              onInit({
                currentUser: { get: () => user },
                isSignedIn: { get: () => clientId === "signedIn" },
                signIn: async () => {
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
        } as gapi.auth2.GoogleAuth;
      }
    },
    load: (apiName, callback) => {
      assert.toBeTrue(apiName === "auth2", "Expecting auth2 API");
      as.callable(callback)();
    }
  } as typeof gapi;

  interface Reason {
    readonly details: string;
    readonly error: string;
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

  await expect(google.idToken()).resolves.toBe(clientId);
});

test("Google.idToken: signedIn", async () => {
  const clientId = "signedIn";

  const google = new Google(clientId);

  await expect(google.idToken()).resolves.toBe(clientId);
});

test("Google.idToken: unknown_error", async () => {
  const clientId = "unknown_error";

  const google = new Google(clientId);

  const error = new Error("Unknown error");

  await expect(google.idToken()).rejects.toStrictEqual(error);
});

test("Google.loadSdk", async () => {
  const google = new Google(clientId);

  const expected = ["https://apis.google.com/js/api:client.js"] as const;

  expect(getScript).mockCallsToBe();
  await google.loadSdk();
  expect(getScript).mockCallsToBe(expected);
  await google.loadSdk();
  expect(getScript).mockCallsToBe();

  async function clientId(): Promise<stringU> {
    await Promise.resolve();

    return "signedIn";
  }
});
