"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestSetup = exports.jestReset = void 0;
const tslib_1 = require("tslib");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const en_US_1 = tslib_1.__importDefault(require("date-fns/locale/en-US"));
const __1 = require("..");
const expect_1 = require("./expect");
exports.jestReset = (0, functions_1.defineFn)(
/**
 * Jest reset.
 */
() => {
    const { naturalCompareWrapper } = __1.implementations.compare;
    const { PouchWrapper } = __1.implementations.database;
    const { dateFnsWrapper } = __1.implementations.datetime;
    const { Facebook } = __1.implementations.facebook;
    const { loremIpsumWrapper } = __1.implementations.faker;
    const { Google } = __1.implementations.google;
    const { promiseHandler } = __1.implementations.handlePromise;
    const { axiosWrapper } = __1.implementations.httpRequest;
    const { lunrWrapper } = __1.implementations.inlineSearch;
    const { progressBar } = __1.implementations.progressReporter;
    const { reflectStorage } = __1.implementations.reactiveStorage;
    const { jsAlert } = __1.implementations.showAlert;
    const { jsConfirm } = __1.implementations.showConfirm;
    const { configurableTestDelay } = __1.implementations.testDelay;
    const { uuidWrapper } = __1.implementations.uniqueId;
    {
        facades_1.compare.setImplementation(naturalCompareWrapper);
        facades_1.database.setImplementation(new PouchWrapper());
        facades_1.datetime.setImplementation(dateFnsWrapper);
        facades_1.facebook.setImplementation(new Facebook(undefined, "10.0"));
        facades_1.faker.setImplementation(loremIpsumWrapper);
        facades_1.google.setImplementation(new Google(undefined));
        facades_1.handlePromise.setImplementation(promiseHandler);
        facades_1.httpRequest.setImplementation(axiosWrapper);
        facades_1.inlineSearch.setImplementation(lunrWrapper);
        facades_1.progressReporter.setImplementation(progressBar);
        facades_1.reactiveStorage.setImplementation(reflectStorage);
        facades_1.showAlert.setImplementation(jsAlert);
        facades_1.showConfirm.setImplementation(jsConfirm);
        facades_1.testDelay.setImplementation(configurableTestDelay);
        facades_1.uniqueId.setImplementation(uuidWrapper);
    }
    {
        facades_1.progressReporter.reset();
    }
    {
        dateFnsWrapper.configure((0, functions_1.typedef)({
            firstDayOfWeek: 0,
            locale: en_US_1.default,
            pm: true
        }));
        loremIpsumWrapper.configure((0, functions_1.typedef)({
            maxSentences: 2,
            maxWords: 3,
            minSentences: 2,
            minWords: 3
        }));
        promiseHandler.configure((0, functions_1.typedef)({
            expectedDurations: {
                createDb: 1000,
                dbRequest: 1000,
                destroyDb: 1000,
                httpRequest: 1000,
                navigation: 1000
            }
        }));
        axiosWrapper.configure((0, functions_1.typedef)({
            timeout: 1000
        }));
        progressBar.configure((0, functions_1.typedef)({
            activeClass: "progress-bar-active",
            enabled: true,
            finalEasing: false,
            finalEasingSpeed: 500,
            latency: 0,
            precision: 3,
            selector: "#progressBar",
            updateInterval: 100
        }));
        configurableTestDelay.configure((0, functions_1.typedef)({
            enabled: false,
            timeout: 1000
        }));
    }
}, {
    /**
     * Jest reset.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (localeName, definitions) => {
        const { dictionary } = __1.implementations.lang;
        facades_1.lang.setImplementation(dictionary.Dictionary.create(definitions));
        dictionary.configure((0, functions_1.typedef)({ localeName }));
    }
});
exports.jestSetup = (0, functions_1.defineFn)(
/**
 * Jest setup.
 */
() => {
    expect.extend(expect_1.matchers);
    (0, exports.jestReset)();
}, {
    /**
     * Jest setup.
     *
     * @param localeName - Locale name.
     * @param definitions - Language definitions.
     */
    dictionary: (localeName, definitions) => {
        exports.jestReset.dictionary(localeName, definitions);
    }
});
//# sourceMappingURL=index.js.map