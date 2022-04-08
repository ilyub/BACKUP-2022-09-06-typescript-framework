import $ from "jquery";

import type { Facade } from "@skylib/facades/dist/google";
import * as assert from "@skylib/functions/dist/assertions";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { AsyncPromise } from "@skylib/functions/dist/types/function";

export class Google implements Facade {
  /**
   * Creates class instance.
   *
   * @param clientId - Client ID.
   */
  public constructor(clientId: AsyncPromise<stringU> | stringU) {
    this.clientId = clientId;
  }

  public async idToken(): Promise<stringU> {
    try {
      await this.loadSdk();
      assert.not.empty(this.sdk);

      const sdk = await this.sdk;

      const user = sdk.isSignedIn.get()
        ? sdk.currentUser.get()
        : await sdk.signIn();

      return user.getAuthResponse().id_token;
    } catch (e) {
      if (
        is.object.of(e, { error: is.string }, {}) &&
        e.error === "popup_closed_by_user"
      )
        return undefined;

      throw e;
    }
  }

  public async loadSdk(): Promise<void> {
    this.sdk =
      this.sdk ??
      fn.run(async () => {
        await $.getScript("https://apis.google.com/js/api:client.js");

        const clientId = is.callable(this.clientId)
          ? await this.clientId()
          : await this.clientId;

        assert.not.empty(clientId, "Missing Google client ID");

        return new Promise(
          (
            // eslint-disable-next-line @skylib/prefer-readonly -- ??
            resolve: (value: GoogleAuth) => void,
            reject: (reason: unknown) => void
          ) => {
            gapi.load("auth2", () => {
              // eslint-disable-next-line github/no-then, promise/prefer-await-to-then -- ???
              gapi.auth2.init({ client_id: clientId }).then(
                googleAuth => {
                  resolve(googleAuth);
                },
                // eslint-disable-next-line @skylib/prefer-readonly -- ??
                e => {
                  reject(new Error(`Error ${e.error}: ${e.details}`));
                }
              );
            });
          }
        );
      });

    await this.sdk;
  }

  protected clientId: AsyncPromise<stringU> | stringU;

  protected sdk: Promise<GoogleAuth> | undefined = undefined;
}

// eslint-disable-next-line @skylib/prefer-readonly -- ??
export type GoogleAuth = Omit<gapi.auth2.GoogleAuth, "then">;
