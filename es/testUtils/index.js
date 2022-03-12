import enUS from "date-fns/locale/en-US";
import { compare } from "@skylib/facades/es/compare";
import { database } from "@skylib/facades/es/database";
import { datetime } from "@skylib/facades/es/datetime";
import { facebook } from "@skylib/facades/es/facebook";
import { faker } from "@skylib/facades/es/faker";
import { google } from "@skylib/facades/es/google";
import { handlePromise } from "@skylib/facades/es/handlePromise";
import { httpRequest } from "@skylib/facades/es/httpRequest";
import { inlineSearch } from "@skylib/facades/es/inlineSearch";
import { lang } from "@skylib/facades/es/lang";
import { progressReporter } from "@skylib/facades/es/progressReporter";
import { reactiveStorage } from "@skylib/facades/es/reactiveStorage";
import { showAlert } from "@skylib/facades/es/showAlert";
import { showConfirm } from "@skylib/facades/es/showConfirm";
import { testDelay } from "@skylib/facades/es/testDelay";
import { uniqueId } from "@skylib/facades/es/uniqueId";
import * as assert from "@skylib/functions/es/assertions";
import * as naturalCompareWrapper from "../facade-implementations/compare/natural-compare-wrapper";
import { PouchDBWrapper } from "../facade-implementations/database/PouchDBWrapper";
import * as dateFnsWrapper from "../facade-implementations/datetime/date-fns-wrapper";
import { Facebook } from "../facade-implementations/facebook/Facebook";
import { loremIpsumWrapper } from "../facade-implementations/faker/lorem-ipsum-wrapper";
import { Google } from "../facade-implementations/google/Google";
import * as promiseHandler from "../facade-implementations/handlePromise/promiseHandler";
import * as axiosWrapper from "../facade-implementations/httpRequest/axios-wrapper";
import * as lunrWrapper from "../facade-implementations/inlineSearch/lunr-wrapper";
import { Dictionary } from "../facade-implementations/lang/dictionary";
import * as progressBar from "../facade-implementations/progressReporter/progressBar";
import * as reflectStorage from "../facade-implementations/reactiveStorage/reflectStorage";
import * as jsAlert from "../facade-implementations/showAlert/jsAlert";
import * as jsConfirm from "../facade-implementations/showConfirm/jsConfirm";
import * as configurableTestDelay from "../facade-implementations/testDelay/configurableTestDelay";
import * as uuidWrapper from "../facade-implementations/uniqueId/uuidWrapper";
/**
 * Jest reset.
 */
export function jestReset() {
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
        const config = {
            firstDayOfWeek: 0,
            locale: enUS,
            pm: true
        };
        dateFnsWrapper.configure(config);
        datetime.setImplementation(dateFnsWrapper.implementation);
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
        handlePromise.setImplementation(promiseHandler.implementation);
    }
    {
        const config = { timeout: 30000 };
        axiosWrapper.configure(config);
        httpRequest.setImplementation(axiosWrapper.implementation);
    }
    {
        const config = {
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
export function jestResetDictionary(localeName, definitions) {
    const config = { localeName };
    Dictionary.configure(config);
    lang.setImplementation(Dictionary.create(definitions));
}
jestReset.dictionary = jestResetDictionary;
/**
 * Jest reset.
 */
export function jestResetDom() {
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
    progressReporter.setImplementation(progressBar.implementation);
    progressReporter.reset();
}
jestReset.dom = jestResetDom;
/**
 * Jest setup.
 */
export function jestSetup() {
    {
        const expectExtend = {
            datetimeToEqual
        };
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect.extend(expectExtend);
    }
    jestReset();
}
/**
 * Jest setup.
 *
 * @param localeName - Locale name.
 * @param definitions - Language definitions.
 */
export function jestSetupDictionary(localeName, definitions) {
    jestReset.dictionary(localeName, definitions);
}
jestSetup.dictionary = jestSetupDictionary;
/**
 * Jest setup.
 */
export function jestSetupDom() {
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
export function datetimeToEqual(got, expected) {
    assert.instance(got, dateFnsWrapper.DateTime);
    return got.toTime() === new Date(expected).getTime()
        ? {
            message: () => `Expected date not to be "${expected}"`,
            pass: true
        }
        : {
            message: () => `Expected date to be "${expected}", got "${got.toString()}"`,
            pass: false
        };
}
//# sourceMappingURL=index.js.map