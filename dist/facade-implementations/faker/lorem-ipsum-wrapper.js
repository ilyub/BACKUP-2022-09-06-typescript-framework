"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loremIpsumWrapper = void 0;
const tslib_1 = require("tslib");
const lorem_ipsum_1 = require("lorem-ipsum");
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
exports.loremIpsumWrapper = {
    configure(config) {
        o.assign(moduleConfig, config);
    },
    getConfiguration() {
        return moduleConfig;
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
        return (0, lorem_ipsum_1.loremIpsum)({
            suffix: "\n",
            units: "words"
        });
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