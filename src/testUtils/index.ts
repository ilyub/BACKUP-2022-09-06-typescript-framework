import enUS from "date-fns/locale/en-US";

import { compare } from "@skylib/facades/dist/compare";
import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { facebook } from "@skylib/facades/dist/facebook";
import { faker } from "@skylib/facades/dist/faker";
import { google } from "@skylib/facades/dist/google";
import { handlePromise } from "@skylib/facades/dist/handlePromise";
import { httpRequest } from "@skylib/facades/dist/httpRequest";
import { inlineSearch } from "@skylib/facades/dist/inlineSearch";
import { lang } from "@skylib/facades/dist/lang";
import { progressReporter } from "@skylib/facades/dist/progressReporter";
import { reactiveStorage } from "@skylib/facades/dist/reactiveStorage";
import { showAlert } from "@skylib/facades/dist/showAlert";
import { showConfirm } from "@skylib/facades/dist/showConfirm";
import { testDelay } from "@skylib/facades/dist/testDelay";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import * as assert from "@skylib/functions/dist/assertions";
import * as o from "@skylib/functions/dist/object";
import type * as testUtils from "@skylib/functions/dist/testUtils";
import type { LocaleName } from "@skylib/functions/dist/types/configurable";
import type { Rec } from "@skylib/functions/dist/types/core";

import * as naturalCompareWrapper from "../facade-implementations/compare/natural-compare-wrapper";
import { PouchDBWrapper } from "../facade-implementations/database/PouchDBWrapper";
import * as dateFnsWrapper from "../facade-implementations/datetime/date-fns-wrapper";
import { Facebook } from "../facade-implementations/facebook/Facebook";
import { loremIpsumWrapper } from "../facade-implementations/faker/lorem-ipsum-wrapper";
import { Google } from "../facade-implementations/google/Google";
import * as promiseHandler from "../facade-implementations/handlePromise/promiseHandler";
import * as axiosWrapper from "../facade-implementations/httpRequest/axios-wrapper";
import * as lunrWrapper from "../facade-implementations/inlineSearch/lunr-wrapper";
import type { Definitions } from "../facade-implementations/lang/dictionary";
import { Dictionary } from "../facade-implementations/lang/dictionary";
import * as progressBar from "../facade-implementations/progressReporter/progressBar";
import * as reflectStorage from "../facade-implementations/reactiveStorage/reflectStorage";
import * as jsAlert from "../facade-implementations/showAlert/jsAlert";
import * as jsConfirm from "../facade-implementations/showConfirm/jsConfirm";
import * as configurableTestDelay from "../facade-implementations/testDelay/configurableTestDelay";
import * as uuidWrapper from "../facade-implementations/uniqueId/uuidWrapper";

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks that datetime equals expected value.
       *
       * @param expected - Expected value.
       * @returns Result object.
       */
      readonly datetimeToEqual: (expected: string) => R;
    }
  }
}

/**
 * Jest reset.
 */
export const jestReset = o.extend(
  (): void => {
    faker.setImplementation(loremIpsumWrapper);
    compare.setImplementation(naturalCompareWrapper.implementation);
    database.setImplementation(new PouchDBWrapper());
    facebook.setImplementation(new Facebook(undefined, "10.0"));
    google.setImplementation(new Google(undefined));
    inlineSearch.setImplementation(lunrWrapper.implementation);
    reactiveStorage.setImplementation(reflectStorage.implementation);
    showAlert.setImplementation(jsAlert.implementation);
    showConfirm.setImplementation(jsConfirm.implementation);
    uniqueId.setImplementation(uuidWrapper.implementation);

    {
      const config: dateFnsWrapper.Configuration = {
        firstDayOfWeek: 0,
        locale: enUS,
        pm: true
      };

      dateFnsWrapper.configure(config);
      datetime.setImplementation(dateFnsWrapper.implementation);
    }

    {
      const config: promiseHandler.Configuration = {
        expectedDurations: {
          createDb: 1000,
          dbRequest: 1000,
          destroyDb: 1000,
          httpRequest: 1000,
          navigation: 1000
        }
      };

      promiseHandler.configure(config);
      handlePromise.setImplementation(promiseHandler.implementation);
    }

    {
      const config: axiosWrapper.Configuration = { timeout: 30_000 };

      axiosWrapper.configure(config);
      httpRequest.setImplementation(axiosWrapper.implementation);
    }

    {
      const config: configurableTestDelay.Configuration = {
        enabled: false,
        timeout: 1000
      };

      configurableTestDelay.configure(config);
      testDelay.setImplementation(configurableTestDelay.implementation);
    }
  },
  {
    /**
     * Jest reset.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(
      this: void,
      localeName: LocaleName,
      definitions: Rec<LocaleName, Definitions>
    ): void {
      const config: Dictionary.Configuration = { localeName };

      Dictionary.configure(config);
      lang.setImplementation(Dictionary.create(definitions));
    },
    /**
     * Jest reset.
     *
     * @param this - No this.
     */
    dom(this: void): void {
      const config: progressBar.Configuration = {
        activeClass: "progress-bar-active",
        enabled: true,
        finalEasing: false,
        finalEasingSpeed: 500,
        latency: 0,
        precision: 3,
        selector: "#progressBar",
        updateInterval: 100
      };

      progressBar.configure(config);
      progressReporter.setImplementation(progressBar.implementation);
      progressReporter.reset();
    }
  }
);

/**
 * Jest setup.
 */
export const jestSetup = o.extend(
  (): void => {
    {
      const expectExtend: ExpectExtendMap = { datetimeToEqual };

      // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
      expect.extend(expectExtend as ExpectExtendMap & jest.ExpectExtendMap);

      interface ExpectExtendMap {
        readonly datetimeToEqual: testUtils.ExpectFromMatcher<"datetimeToEqual">;
      }
    }

    jestReset();
  },
  {
    /**
     * Jest setup.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(
      this: void,
      localeName: LocaleName,
      definitions: Rec<LocaleName, Definitions>
    ): void {
      jestReset.dictionary(localeName, definitions);
    },
    /**
     * Jest setup.
     *
     * @param this - No this.
     */
    dom(this: void): void {
      jestReset.dom();
    }
  }
);

/**
 * Checks that datetime equals expected value.
 *
 * @param got - Got value.
 * @param expected - Expected value.
 * @returns Result object.
 */
export function datetimeToEqual(
  got: unknown,
  expected: string
): testUtils.ExpectReturnType {
  assert.instance(got, dateFnsWrapper.DateTime);

  return got.toTime() === new Date(expected).getTime()
    ? {
        message: (): string => `Expected date not to be "${expected}"`,
        pass: true
      }
    : {
        message: (): string =>
          `Expected date to be "${expected}", got "${got.toString()}"`,
        pass: false
      };
}
