import { compare, database, datetime, facebook, faker, google, handlePromise, httpRequest, inlineSearch, lang, progressReporter, reactiveStorage, showAlert, showConfirm, testDelay, uniqueId } from "@skylib/facades";
import { assert, o } from "@skylib/functions";
import enUS from "date-fns/locale/en-US";
import { facadeImplementations as implementations } from "..";
/**
 * Jest reset.
 */
export const jestReset = o.extend(() => {
    faker.setImplementation(implementations.faker.loremIpsumWrapper);
    compare.setImplementation(implementations.compare.naturalCompare);
    database.setImplementation(new implementations.database.PouchDBWrapper());
    facebook.setImplementation(new implementations.facebook.Facebook(undefined, "10.0"));
    google.setImplementation(new implementations.google.Google(undefined));
    inlineSearch.setImplementation(implementations.inlineSearch.lunrWrapper);
    reactiveStorage.setImplementation(implementations.reactiveStorage.reflectStorage);
    showAlert.setImplementation(implementations.showAlert.jsAlert);
    showConfirm.setImplementation(implementations.showConfirm.jsConfirm);
    uniqueId.setImplementation(implementations.uniqueId.uuidWrapper);
    {
        const config = {
            firstDayOfWeek: 0,
            locale: enUS,
            pm: true
        };
        implementations.datetime.dateFnsWrapper.configure(config);
        datetime.setImplementation(implementations.datetime.dateFnsWrapper.implementation);
    }
    {
        const config = {
            expectedDurations: {
                createDb: 1000,
                dbRequest: 1000,
                destroyDb: 1000,
                httpRequest: 1000,
                navigation: 1000
            }
        };
        implementations.handlePromise.promiseHandler.configure(config);
        handlePromise.setImplementation(implementations.handlePromise.promiseHandler.implementation);
    }
    {
        const config = {
            timeout: 30000
        };
        implementations.httpRequest.axiosWrapper.configure(config);
        httpRequest.setImplementation(implementations.httpRequest.axiosWrapper.implementation);
    }
    {
        const config = { enabled: false, timeout: 1000 };
        implementations.testDelay.configurableTestDelay.configure(config);
        testDelay.setImplementation(implementations.testDelay.configurableTestDelay.implementation);
    }
}, {
    /**
     * Jest reset.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(localeName, definitions) {
        const config = {
            localeName
        };
        implementations.lang.dictionary.Dictionary.configure(config);
        lang.setImplementation(implementations.lang.dictionary.Dictionary.create(definitions));
    },
    /**
     * Jest reset.
     *
     * @param this - No this.
     */
    dom() {
        const config = {
            activeClass: "progress-bar-active",
            enabled: true,
            finalEasing: false,
            finalEasingSpeed: 500,
            latency: 0,
            precision: 3,
            selector: "#progressBar",
            updateInterval: 100
        };
        implementations.progressReporter.progressBar.configure(config);
        progressReporter.setImplementation(implementations.progressReporter.progressBar.implementation);
        progressReporter.reset();
    }
});
/**
 * Jest setup.
 */
export const jestSetup = o.extend(() => {
    {
        const expectExtend = { datetimeToEqual };
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
        expect.extend(expectExtend);
    }
    jestReset();
}, {
    /**
     * Jest setup.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(localeName, definitions) {
        jestReset.dictionary(localeName, definitions);
    },
    /**
     * Jest setup.
     *
     * @param this - No this.
     */
    dom() {
        jestReset.dom();
    }
});
/**
 * Checks that datetime equals expected value.
 *
 * @param got - Got value.
 * @param expected - Expected value.
 * @returns Result object.
 */
export const datetimeToEqual = (got, expected) => {
    assert.instance(got, implementations.datetime.dateFnsWrapper.DateTime);
    return got.toTime() === new Date(expected).getTime()
        ? {
            message: () => `Expected date not to be "${expected}"`,
            pass: true
        }
        : {
            message: () => `Expected date to be "${expected}", got "${got.toString()}"`,
            pass: false
        };
};
//# sourceMappingURL=index.js.map