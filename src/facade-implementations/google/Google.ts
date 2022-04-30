import { assert, fn, is } from "@skylib/functions";
import $ from "jquery";
import type { google } from "@skylib/facades";
import type { stringU, AsyncPromise } from "@skylib/functions";

export class Google implements google.Facade {
  /**
   * Creates class instance.
   *
   * @param clientId - Client ID.
   */
  public constructor(clientId: AsyncPromise<stringU> | stringU) {
    this.clientId = clientId;
  }

  public async idToken(): Promise<stringU> {
    const sdk = await this._loadSdk();

    try {
      const user = sdk.isSignedIn.get()
        ? sdk.currentUser.get()
        : await sdk.signIn();

      return user.getAuthResponse().id_token;
    } catch (e) {
      if (is.indexedObject(e) && e["error"] === "popup_closed_by_user")
        return undefined;

      throw e;
    }
  }

  public async loadSdk(): Promise<void> {
    await this._loadSdk();
  }

  protected readonly clientId: AsyncPromise<stringU> | stringU;

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected sdk: Promise<Google.Auth> | undefined;

  /**
   * Loads SDK.
   *
   * @returns SDK.
   */
  protected async _loadSdk(): Promise<Google.Auth> {
    this.sdk =
      this.sdk ??
      fn.run(async () => {
        await $.getScript("https://apis.google.com/js/api:client.js");

        const clientId = is.callable(this.clientId)
          ? await this.clientId()
          : await this.clientId;

        assert.not.empty(clientId, "Missing Google client ID");

        return await new Promise(
          (
            resolve: (value: Google.Auth) => void,
            reject: (reason: unknown) => void
          ) => {
            gapi.load("auth2", () => {
              // eslint-disable-next-line github/no-then -- Ok
              gapi.auth2.init({ client_id: clientId }).then(
                googleAuth => {
                  resolve(googleAuth);
                },
                e => {
                  reject(new Error(`Error ${e.error}: ${e.details}`));
                }
              );
            });
          }
        );
      });

    return await this.sdk;
  }
}

export namespace Google {
  export interface Auth extends Omit<gapi.auth2.GoogleAuth, "then"> {}
}
