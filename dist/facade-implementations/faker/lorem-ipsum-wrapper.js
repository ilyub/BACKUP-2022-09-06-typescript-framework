"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loremIpsumWrapper = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
const lorem_ipsum_1 = require("lorem-ipsum");
const datetime_1 = require("@skylib/facades/dist/datetime");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const num = tslib_1.__importStar(require("@skylib/functions/dist/number"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
exports.loremIpsumWrapper = {
    boolean() {
        return this.oneOf([true, false]);
    },
    configure(config) {
        o.assign(moduleConfig, config);
    },
    date(from, to, step = 1, unit = "minute") {
        const fromTime = is.string(from)
            ? datetime_1.datetime.create(from).toTime()
            : datetime_1.datetime
                .create()
                .add(...from)
                .toTime();
        const toTime = is.string(to)
            ? datetime_1.datetime.create(to).toTime()
            : datetime_1.datetime
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
        return datetime_1.datetime.create(new Date(time)).toString();
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
        return (0, lorem_ipsum_1.loremIpsum)({
            paragraphLowerBound: minSentences !== null && minSentences !== void 0 ? minSentences : moduleConfig.minSentences,
            paragraphUpperBound: maxSentences !== null && maxSentences !== void 0 ? maxSentences : moduleConfig.maxSentences,
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "paragraphs"
        });
    },
    phrase(minWords, maxWords) {
        return (0, lorem_ipsum_1.loremIpsum)({
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "sentences"
        }).replace(/\.$/u, "");
    },
    sentence(minWords, maxWords) {
        return (0, lorem_ipsum_1.loremIpsum)({
            sentenceLowerBound: minWords !== null && minWords !== void 0 ? minWords : moduleConfig.minWords,
            sentenceUpperBound: maxWords !== null && maxWords !== void 0 ? maxWords : moduleConfig.maxWords,
            suffix: "\n",
            units: "sentences"
        });
    },
    word() {
        return (0, lorem_ipsum_1.loremIpsum)({ suffix: "\n", units: "words" });
    }
};
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const moduleConfig = {
    maxSentences: 5,
    maxWords: 10,
    minSentences: 3,
    minWords: 5
};
//# sourceMappingURL=lorem-ipsum-wrapper.js.map