import type { Facade } from "@skylib/facades/dist/facebook";
import * as assert from "@skylib/functions/dist/assertions";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { AsyncPromise } from "@skylib/functions/dist/types/function";
import $ from "jquery";

export class Facebook implements Facade {
  /**
   * Creates class instance.
   *
   * @param appId - Facebook app ID.
   * @param version - Version.
   */
  public constructor(appId: AsyncPromise<stringU> | stringU, version: string) {
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
      fn.run(async (): Promise<void> => {
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

  protected readonly appId: AsyncPromise<stringU> | stringU;

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected sdk: Promise<void> | undefined = undefined;

  protected readonly version: string;
}
