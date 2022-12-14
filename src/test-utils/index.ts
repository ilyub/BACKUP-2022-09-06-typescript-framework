import {
  compare,
  database,
  datetime,
  facebook,
  faker,
  google,
  handlePromise,
  httpRequest,
  inlineSearch,
  lang,
  progressReporter,
  reactiveStorage,
  showAlert,
  showConfirm,
  testDelay,
  uniqueId
} from "@skylib/facades";
import { defineFn, typedef } from "@skylib/functions";
import type { LocaleName } from "@skylib/functions";
import enUs from "date-fns/locale/en-US";
import { implementations } from "..";
import { matchers } from "./expect";

export const jestReset = defineFn(
  /**
   * Jest reset.
   */
  (): void => {
    const { naturalCompareWrapper } = implementations.compare;

    const { PouchWrapper } = implementations.database;

    const { dateFnsWrapper } = implementations.datetime;

    const { Facebook } = implementations.facebook;

    const { loremIpsumWrapper } = implementations.faker;

    const { Google } = implementations.google;

    const { promiseHandler } = implementations.handlePromise;

    const { axiosWrapper } = implementations.httpRequest;

    const { lunrWrapper } = implementations.inlineSearch;

    const { progressBar } = implementations.progressReporter;

    const { reflectStorage } = implementations.reactiveStorage;

    const { jsAlert } = implementations.showAlert;

    const { jsConfirm } = implementations.showConfirm;

    const { configurableTestDelay } = implementations.testDelay;

    const { uuidWrapper } = implementations.uniqueId;

    {
      compare.setImplementation(naturalCompareWrapper);
      database.setImplementation(new PouchWrapper());
      datetime.setImplementation(dateFnsWrapper);
      facebook.setImplementation(new Facebook(undefined, "10.0"));
      faker.setImplementation(loremIpsumWrapper);
      google.setImplementation(new Google(undefined));
      handlePromise.setImplementation(promiseHandler);
      httpRequest.setImplementation(axiosWrapper);
      inlineSearch.setImplementation(lunrWrapper);
      progressReporter.setImplementation(progressBar);
      reactiveStorage.setImplementation(reflectStorage);
      showAlert.setImplementation(jsAlert);
      showConfirm.setImplementation(jsConfirm);
      testDelay.setImplementation(configurableTestDelay);
      uniqueId.setImplementation(uuidWrapper);
    }

    {
      progressReporter.reset();
    }

    {
      dateFnsWrapper.configure(
        typedef<implementations.datetime.dateFnsWrapper.Configuration>({
          firstDayOfWeek: 0,
          locale: enUs,
          pm: true
        })
      );
      loremIpsumWrapper.configure(
        typedef<implementations.faker.loremIpsumWrapper.Configuration>({
          maxSentences: 2,
          maxWords: 3,
          minSentences: 2,
          minWords: 3
        })
      );
      promiseHandler.configure(
        typedef<implementations.handlePromise.promiseHandler.Configuration>({
          expectedDurations: {
            createDb: 1000,
            dbRequest: 1000,
            destroyDb: 1000,
            httpRequest: 1000,
            navigation: 1000
          }
        })
      );
      axiosWrapper.configure(
        typedef<implementations.httpRequest.axiosWrapper.Configuration>({
          timeout: 1000
        })
      );
      progressBar.configure(
        typedef<implementations.progressReporter.progressBar.Configuration>({
          activeClass: "progress-bar-active",
          enabled: true,
          finalEasing: false,
          finalEasingSpeed: 500,
          latency: 0,
          precision: 3,
          selector: "#progressBar",
          updateInterval: 100
        })
      );
      configurableTestDelay.configure(
        typedef<implementations.testDelay.configurableTestDelay.Configuration>({
          enabled: false,
          timeout: 1000
        })
      );
    }
  },
  {
    /**
     * Jest reset.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (
      localeName: LocaleName,
      definitions: implementations.lang.dictionary.DefinitionsByLocale
    ): void => {
      const { dictionary } = implementations.lang;

      lang.setImplementation(dictionary.Dictionary.create(definitions));
      dictionary.configure(
        typedef<implementations.lang.dictionary.Configuration>({ localeName })
      );
    }
  }
);

export const jestSetup = defineFn(
  /**
   * Jest setup.
   */
  (): void => {
    expect.extend(matchers);
    jestReset();
  },
  {
    /**
     * Jest setup.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (
      localeName: LocaleName,
      definitions: implementations.lang.dictionary.DefinitionsByLocale
    ): void => {
      jestReset.dictionary(localeName, definitions);
    }
  }
);
