import enUS from "date-fns/locale/en-US";

import { database } from "@skylib/facades/dist/database";
import { datetime } from "@skylib/facades/dist/datetime";
import { facebook } from "@skylib/facades/dist/facebook";
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
import type * as testUtils from "@skylib/functions/dist/testUtils";
import type { ReadonlyRecord } from "@skylib/functions/dist/types/core";
import type { LocaleName } from "@skylib/functions/dist/types/locales";

import { PouchDBWrapper } from "../facade-implementations/database/PouchDBWrapper";
import * as dateFnsWrapper from "../facade-implementations/datetime/date-fns-wrapper";
import { Facebook } from "../facade-implementations/facebook/Facebook";
import { Google } from "../facade-implementations/google/Google";
import * as promiseHandler from "../facade-implementations/handlePromise/promiseHandler";
import * as axiosWrapper from "../facade-implementations/httpRequest/axios-wrapper";
import * as minisearchWrapper from "../facade-implementations/inlineSearch/minisearch-wrapper";
import type { Definitions } from "../facade-implementations/lang/dictionary";
import { Dictionary } from "../facade-implementations/lang/dictionary";
import * as progressBar from "../facade-implementations/progressReporter/progressBar";
import * as dummyStorage from "../facade-implementations/reactiveStorage/dummyStorage";
import * as jsAlert from "../facade-implementations/showAlert/jsAlert";
import * as jsConfirm from "../facade-implementations/showConfirm/jsConfirm";
import * as configurableTestDelay from "../facade-implementations/testDelay/configurableTestDelay";
import * as uuidWrapper from "../facade-implementations/uniqueId/uuidWrapper";

declare global {
  namespace jest {
    // eslint-disable-next-line @skylib/prefer-readonly
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
export function jestReset(): void {
  database.setImplementation(new PouchDBWrapper());
  facebook.setImplementation(new Facebook(undefined, "10.0"));
  google.setImplementation(new Google(undefined));
  inlineSearch.setImplementation(minisearchWrapper.implementation);
  reactiveStorage.setImplementation(dummyStorage.implementation);
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
}

/**
 * Jest reset.
 *
 * @param localeName - Locale name.
 * @param definitions - Language definitions.
 */
export function jestResetDictionary(
  localeName: LocaleName,
  definitions: ReadonlyRecord<LocaleName, Definitions>
): void {
  const config: Dictionary.Configuration = { localeName };

  Dictionary.configure(config);
  lang.setImplementation(Dictionary.create(definitions));
}

jestReset.dictionary = jestResetDictionary;

/**
 * Jest reset.
 */
export function jestResetDom(): void {
  const config: progressBar.Configuration = {
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

jestReset.dom = jestResetDom;

/**
 * Jest setup.
 */
export function jestSetup(): void {
  {
    interface ExpectExtendMap {
      readonly datetimeToEqual: testUtils.ExpectFromMatcher<"datetimeToEqual">;
    }

    const expectExtend: ExpectExtendMap = {
      datetimeToEqual
    };

    expect.extend(expectExtend as jest.ExpectExtendMap & ExpectExtendMap);
  }

  jestReset();
}

/**
 * Jest setup.
 *
 * @param localeName - Locale name.
 * @param definitions - Language definitions.
 */
export function jestSetupDictionary(
  localeName: LocaleName,
  definitions: ReadonlyRecord<LocaleName, Definitions>
): void {
  jestReset.dictionary(localeName, definitions);
}

jestSetup.dictionary = jestSetupDictionary;

/**
 * Jest setup.
 */
export function jestSetupDom(): void {
  jestReset.dom();
}

jestSetup.dom = jestSetupDom;

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

  return got.toTime() === new Date(expected).getTime() / 1000
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
