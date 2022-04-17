import { datetime } from "@skylib/facades";
import { a, fn, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";
export const loremIpsumWrapper = {
    boolean() {
        return this.oneOf([true, false]);
    },
    configure(config) {
        o.assign(moduleConfig, config);
    },
    date(from, to, step = 1, unit = "minute") {
        const fromTime = is.string(from)
            ? datetime.create(from).toTime()
            : datetime
                .create()
                .add(...from)
                .toTime();
        const toTime = is.string(to)
            ? datetime.create(to).toTime()
            : datetime
                .create()
                .add(...to)
                .toTime();
        const stepTime = fn.run(() => {
            switch (unit) {
                case "day":
                case "days":
                    return step * 24 * 3600 * 1000;
                case "hour":
                case "hours":
                    return step * 3600 * 1000;
                case "minute":
                case "minutes":
                    return step * 60 * 1000;
            }
        });
        const time = num.floor.step(_.random(fromTime, toTime), stepTime);
        return datetime.create(new Date(time)).toString();
    },
    getConfiguration() {
        return moduleConfig;
    },
    number(from, to, step = 1) {
        return num.floor.step(_.random(from, to), step);
    },
    oneOf(values) {
        return a.get(values, _.random(0, values.length - 1));
    },
    paragraph(minSentences, maxSentences, minWords, maxWords) {
        return loremIpsum({
            paragraphLowerBound: minSentences !== null && minSentences !== void 0 ? minSentences : moduleConfig.minSentences,
            paragraphUpperBound: maxSentences !== null && maxSentences !== void 0 ? maxSentences : moduleConfig.maxSentences,
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "paragraphs"
        });
    },
    phrase(minWords, maxWords) {
        return loremIpsum({
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "sentences"
        }).replace(/\.$/u, "");
    },
    sentence(minWords, maxWords) {
        return loremIpsum({
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "sentences"
        });
    },
    word() {
        return loremIpsum({ suffix: "\n", units: "words" });
    }
};
const moduleConfig = {
    maxSentences: 5,
    maxWords: 10,
    minSentences: 3,
    minWords: 5
};
//# sourceMappingURL=lorem-ipsum-wrapper.js.map