import { datetime } from "@skylib/facades";
import { a, evaluate, is, num, o } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { loremIpsum } from "lorem-ipsum";
export const loremIpsumWrapper = {
    boolean: (trueWeight = 0.5, falseWeight = 0.5) => Math.random() < trueWeight / (trueWeight + falseWeight),
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    date: (from, to, step = 1, unit = "minute") => {
        const from2 = is.string(from)
            ? datetime.create(from).toTime()
            : datetime
                .create()
                .add(...from)
                .toTime();
        const to2 = is.string(to)
            ? datetime.create(to).toTime()
            : datetime
                .create()
                .add(...to)
                .toTime();
        const step2 = evaluate(() => {
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
        const time = num.floor.step(_.random(from2, to2), step2);
        return datetime.create(time).toString();
    },
    getConfiguration: () => moduleConfig,
    number: (from, to, step = 1) => num.floor.step(_.random(from, to), step),
    oneOf: (values) => a.get(values, _.random(0, values.length - 1)),
    paragraph: (minSentences, maxSentences, minWords, maxWords) => loremIpsum({
        paragraphLowerBound: minSentences !== null && minSentences !== void 0 ? minSentences : moduleConfig.minSentences,
        paragraphUpperBound: maxSentences !== null && maxSentences !== void 0 ? maxSentences : moduleConfig.maxSentences,
        sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
        sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
        suffix: "\n",
        units: "paragraphs"
    }),
    phrase: (minWords, maxWords) => loremIpsum({
        sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
        sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
        suffix: "\n",
        units: "sentences"
    }).replace(/\.$/u, ""),
    sentence: (minWords, maxWords) => loremIpsum({
        sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
        sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
        suffix: "\n",
        units: "sentences"
    }),
    word: () => loremIpsum({ suffix: "\n", units: "words" })
};
const moduleConfig = {
    maxSentences: 5,
    maxWords: 10,
    minSentences: 3,
    minWords: 5
};
//# sourceMappingURL=index.js.map