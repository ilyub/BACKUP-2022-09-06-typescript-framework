import type { google } from "@skylib/facades";
import { assert, fn, is } from "@skylib/functions";
import type { stringU, AsyncPromise } from "@skylib/functions";
import $ from "jquery";

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

        return await new Promise(
          (
            resolve: (value: GoogleAuth) => void,
            reject: (reason: unknown) => void
          ) => {
            gapi.load("auth2", () => {
              // eslint-disable-next-line github/no-then -- ???
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

    await this.sdk;
  }

  protected readonly clientId: AsyncPromise<stringU> | stringU;

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected sdk: Promise<GoogleAuth> | undefined = undefined;
}

export type GoogleAuth = Omit<gapi.auth2.GoogleAuth, "then">;
