"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeToEqual = exports.jestSetupDom = exports.jestSetupDictionary = exports.jestSetup = exports.jestResetDom = exports.jestResetDictionary = exports.jestReset = void 0;
const tslib_1 = require("tslib");
const en_US_1 = (0, tslib_1.__importDefault)(require("date-fns/locale/en-US"));
const compare_1 = require("@skylib/facades/dist/compare");
const database_1 = require("@skylib/facades/dist/database");
const datetime_1 = require("@skylib/facades/dist/datetime");
const facebook_1 = require("@skylib/facades/dist/facebook");
const faker_1 = require("@skylib/facades/dist/faker");
const google_1 = require("@skylib/facades/dist/google");
const handlePromise_1 = require("@skylib/facades/dist/handlePromise");
const httpRequest_1 = require("@skylib/facades/dist/httpRequest");
const inlineSearch_1 = require("@skylib/facades/dist/inlineSearch");
const lang_1 = require("@skylib/facades/dist/lang");
const progressReporter_1 = require("@skylib/facades/dist/progressReporter");
const reactiveStorage_1 = require("@skylib/facades/dist/reactiveStorage");
const showAlert_1 = require("@skylib/facades/dist/showAlert");
const showConfirm_1 = require("@skylib/facades/dist/showConfirm");
const testDelay_1 = require("@skylib/facades/dist/testDelay");
const uniqueId_1 = require("@skylib/facades/dist/uniqueId");
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const naturalCompareWrapper = (0, tslib_1.__importStar)(require("../facade-implementations/compare/natural-compare-wrapper"));
const PouchDBWrapper_1 = require("../facade-implementations/database/PouchDBWrapper");
const dateFnsWrapper = (0, tslib_1.__importStar)(require("../facade-implementations/datetime/date-fns-wrapper"));
const Facebook_1 = require("../facade-implementations/facebook/Facebook");
const lorem_ipsum_wrapper_1 = require("../facade-implementations/faker/lorem-ipsum-wrapper");
const Google_1 = require("../facade-implementations/google/Google");
const promiseHandler = (0, tslib_1.__importStar)(require("../facade-implementations/handlePromise/promiseHandler"));
const axiosWrapper = (0, tslib_1.__importStar)(require("../facade-implementations/httpRequest/axios-wrapper"));
const lunrWrapper = (0, tslib_1.__importStar)(require("../facade-implementations/inlineSearch/lunr-wrapper"));
const dictionary_1 = require("../facade-implementations/lang/dictionary");
const progressBar = (0, tslib_1.__importStar)(require("../facade-implementations/progressReporter/progressBar"));
const reflectStorage = (0, tslib_1.__importStar)(require("../facade-implementations/reactiveStorage/reflectStorage"));
const jsAlert = (0, tslib_1.__importStar)(require("../facade-implementations/showAlert/jsAlert"));
const jsConfirm = (0, tslib_1.__importStar)(require("../facade-implementations/showConfirm/jsConfirm"));
const configurableTestDelay = (0, tslib_1.__importStar)(require("../facade-implementations/testDelay/configurableTestDelay"));
const uuidWrapper = (0, tslib_1.__importStar)(require("../facade-implementations/uniqueId/uuidWrapper"));
/**
 * Jest reset.
 */
function jestReset() {
    faker_1.faker.setImplementation(lorem_ipsum_wrapper_1.loremIpsumWrapper);
    compare_1.compare.setImplementation(naturalCompareWrapper.implementation);
    database_1.database.setImplementation(new PouchDBWrapper_1.PouchDBWrapper());
    facebook_1.facebook.setImplementation(new Facebook_1.Facebook(undefined, "10.0"));
    google_1.google.setImplementation(new Google_1.Google(undefined));
    inlineSearch_1.inlineSearch.setImplementation(lunrWrapper.implementation);
    reactiveStorage_1.reactiveStorage.setImplementation(reflectStorage.implementation);
    showAlert_1.showAlert.setImplementation(jsAlert.implementation);
    showConfirm_1.showConfirm.setImplementation(jsConfirm.implementation);
    uniqueId_1.uniqueId.setImplementation(uuidWrapper.implementation);
    {
        const config = {
            firstDayOfWeek: 0,
            locale: en_US_1.default,
            pm: true
        };
        dateFnsWrapper.configure(config);
        datetime_1.datetime.setImplementation(dateFnsWrapper.implementation);
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
        promiseHandler.configure(config);
        handlePromise_1.handlePromise.setImplementation(promiseHandler.implementation);
    }
    {
        const config = { timeout: 30000 };
        axiosWrapper.configure(config);
        httpRequest_1.httpRequest.setImplementation(axiosWrapper.implementation);
    }
    {
        const config = {
            enabled: false,
            timeout: 1000
        };
        configurableTestDelay.configure(config);
        testDelay_1.testDelay.setImplementation(configurableTestDelay.implementation);
    }
}
exports.jestReset = jestReset;
/**
 * Jest reset.
 *
 * @param localeName - Locale name.
 * @param definitions - Language definitions.
 */
function jestResetDictionary(localeName, definitions) {
    const config = { localeName };
    dictionary_1.Dictionary.configure(config);
    lang_1.lang.setImplementation(dictionary_1.Dictionary.create(definitions));
}
exports.jestResetDictionary = jestResetDictionary;
jestReset.dictionary = jestResetDictionary;
/**
 * Jest reset.
 */
function jestResetDom() {
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
    progressBar.configure(config);
    progressReporter_1.progressReporter.setImplementation(progressBar.implementation);
    progressReporter_1.progressReporter.reset();
}
exports.jestResetDom = jestResetDom;
jestReset.dom = jestResetDom;
/**
 * Jest setup.
 */
function jestSetup() {
    {
        const expectExtend = {
            datetimeToEqual
        };
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect.extend(expectExtend);
    }
    jestReset();
}
exports.jestSetup = jestSetup;
/**
 * Jest setup.
 *
 * @param localeName - Locale name.
 * @param definitions - Language definitions.
 */
function jestSetupDictionary(localeName, definitions) {
    jestReset.dictionary(localeName, definitions);
}
exports.jestSetupDictionary = jestSetupDictionary;
jestSetup.dictionary = jestSetupDictionary;
/**
 * Jest setup.
 */
function jestSetupDom() {
    jestReset.dom();
}
exports.jestSetupDom = jestSetupDom;
jestSetup.dom = jestSetupDom;
/**
 * Checks that datetime equals expected value.
 *
 * @param got - Got value.
 * @param expected - Expected value.
 * @returns Result object.
 */
function datetimeToEqual(got, expected) {
    assert.instance(got, dateFnsWrapper.DateTime);
    return got.toTime() === new Date(expected).getTime() / 1000
        ? {
            message: () => `Expected date not to be "${expected}"`,
            pass: true
        }
        : {
            message: () => `Expected date to be "${expected}", got "${got.toString()}"`,
            pass: false
        };
}
exports.datetimeToEqual = datetimeToEqual;
//# sourceMappingURL=index.js.map