import { assert, evaluate, is } from "@skylib/functions";
import type { stringU, types } from "@skylib/functions";
import $ from "jquery";
import type { facebook } from "@skylib/facades";

export class Facebook implements facebook.Facade {
  /**
   * Creates class instance.
   *
   * @param appId - App ID.
   * @param version - Version.
   */
  public constructor(
    appId: stringU | types.fn.AsyncPromise<stringU>,
    version: string
  ) {
    this.appId = appId;
    this.version = version;
  }

  public async accessToken(): Promise<stringU> {
    await this.loadSdk();

    const auth = FB.getAuthResponse();

    if (auth) return auth.accessToken;

    const statusResponse = await new Promise<fb.StatusResponse>(resolve => {
      FB.login(response => {
        resolve(response);
      });
    });

    switch (statusResponse.status) {
      case "connected":
        return statusResponse.authResponse.accessToken;

      case "not_authorized":
        return undefined;

      default:
        throw new Error(`Facebook login failed (${statusResponse.status})`);
    }
  }

  public async loadSdk(): Promise<void> {
    this.sdk =
      this.sdk ??
      evaluate(async () => {
        await $.getScript("https://connect.facebook.net/en_US/sdk.js");

        const appId = is.callable(this.appId)
          ? await this.appId()
          : await this.appId;

        assert.not.empty(appId, "Missing Facebook app ID");
        FB.init({
          appId,
          autoLogAppEvents: true,
          version: this.version,
          xfbml: true
        });
      });
    await this.sdk;
  }

  protected readonly appId: stringU | types.fn.AsyncPromise<stringU>;

  // eslint-disable-next-line @skylib/typescript/prefer-readonly-property -- Ok
  protected sdk: Promise<void> | undefined;

  protected readonly version: string;
}
