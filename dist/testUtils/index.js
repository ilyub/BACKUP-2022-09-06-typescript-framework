"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeToEqual = exports.jestSetup = exports.jestReset = void 0;
const tslib_1 = require("tslib");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const en_US_1 = tslib_1.__importDefault(require("date-fns/locale/en-US"));
const __1 = require("..");
/**
 * Jest reset.
 */
exports.jestReset = functions_1.o.extend(() => {
    facades_1.faker.setImplementation(__1.implementations.faker.loremIpsumWrapper);
    facades_1.compare.setImplementation(__1.implementations.compare.naturalCompare);
    facades_1.database.setImplementation(new __1.implementations.database.PouchDBWrapper());
    facades_1.facebook.setImplementation(new __1.implementations.facebook.Facebook(undefined, "10.0"));
    facades_1.google.setImplementation(new __1.implementations.google.Google(undefined));
    facades_1.inlineSearch.setImplementation(__1.implementations.inlineSearch.lunrWrapper);
    facades_1.reactiveStorage.setImplementation(__1.implementations.reactiveStorage.reflectStorage);
    facades_1.showAlert.setImplementation(__1.implementations.showAlert.jsAlert);
    facades_1.showConfirm.setImplementation(__1.implementations.showConfirm.jsConfirm);
    facades_1.uniqueId.setImplementation(__1.implementations.uniqueId.uuidWrapper);
    {
        const config = {
            firstDayOfWeek: 0,
            locale: en_US_1.default,
            pm: true
        };
        __1.implementations.datetime.dateFnsWrapper.configure(config);
        facades_1.datetime.setImplementation(__1.implementations.datetime.dateFnsWrapper.implementation);
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
        __1.implementations.handlePromise.promiseHandler.configure(config);
        facades_1.handlePromise.setImplementation(__1.implementations.handlePromise.promiseHandler.implementation);
    }
    {
        const config = {
            timeout: 30000
        };
        __1.implementations.httpRequest.axiosWrapper.configure(config);
        facades_1.httpRequest.setImplementation(__1.implementations.httpRequest.axiosWrapper.implementation);
    }
    {
        const config = { enabled: false, timeout: 1000 };
        __1.implementations.testDelay.configurableTestDelay.configure(config);
        facades_1.testDelay.setImplementation(__1.implementations.testDelay.configurableTestDelay.implementation);
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
        __1.implementations.lang.dictionary.Dictionary.configure(config);
        facades_1.lang.setImplementation(__1.implementations.lang.dictionary.Dictionary.create(definitions));
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
        __1.implementations.progressReporter.progressBar.configure(config);
        facades_1.progressReporter.setImplementation(__1.implementations.progressReporter.progressBar.implementation);
        facades_1.progressReporter.reset();
    }
});
/**
 * Jest setup.
 */
exports.jestSetup = functions_1.o.extend(() => {
    {
        const expectExtend = { datetimeToEqual: exports.datetimeToEqual };
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- ???
        expect.extend(expectExtend);
    }
    (0, exports.jestReset)();
}, {
    /**
     * Jest setup.
     *
     * @param this - No this.
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary(localeName, definitions) {
        exports.jestReset.dictionary(localeName, definitions);
    },
    /**
     * Jest setup.
     *
     * @param this - No this.
     */
    dom() {
        exports.jestReset.dom();
    }
});
/**
 * Checks that datetime equals expected value.
 *
 * @param got - Got value.
 * @param expected - Expected value.
 * @returns Result object.
 */
const datetimeToEqual = (got, expected) => {
    functions_1.assert.instance(got, __1.implementations.datetime.dateFnsWrapper.DateTime);
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
exports.datetimeToEqual = datetimeToEqual;
//# sourceMappingURL=index.js.map