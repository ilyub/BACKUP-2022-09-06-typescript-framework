"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const tslib_1 = require("tslib");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const regexp = tslib_1.__importStar(require("@skylib/functions/dist/regexp"));
class Definition {
    /**
     * Creates class instance.
     *
     * @param raw - Raw definition.
     * @param id - ID.
     */
    constructor(raw, id) {
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "contexts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesRefDependent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesRefSecondary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesVal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesWord", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rulesWordSecondary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sub", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "subs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        switch (typeof raw) {
            case "object": {
                const [primary, subs, contexts] = is.array(raw)
                    ? raw
                    : [undefined, raw, undefined];
                this.contexts = contexts !== null && contexts !== void 0 ? contexts : {};
                this.subs = o.map(subs, (value, key) => new Definition(value, key));
                this.sub = fn.run(() => {
                    const result = is.not.empty(primary)
                        ? this.subs[primary]
                        : o.values(this.subs)[0];
                    assert.not.empty(result, `Invalid primary reference: ${id}`);
                    return result;
                });
                this.value = this.sub.value;
                break;
            }
            case "string":
                this.value = raw;
                break;
        }
        const reRef = /<([^\s.:<>{}]+):([^\s.:<>{}]+)>/u;
        const reRefDependent = /<([^\s.:<>{}]+)>/u;
        const reRefSecondary = /<([^\s.:<>{}]+)\.([^\s.:<>{}]+)>/u;
        const reVal = /@([^\s.:<>{}]+)/u;
        const reWord = /\{([^\s.:<>{}]+)\}/u;
        const reWordSecondary = /\{([^\s.:<>{}]+)\.([^\s.:<>{}]+)\}/u;
        this.rulesRef = regexp.matchAll(this.value, reRef);
        this.rulesRefDependent = regexp.matchAll(this.value, reRefDependent);
        this.rulesRefSecondary = regexp.matchAll(this.value, reRefSecondary);
        this.rulesVal = regexp.matchAll(this.value, reVal);
        this.rulesWord = regexp.matchAll(this.value, reWord);
        this.rulesWordSecondary = regexp.matchAll(this.value, reWordSecondary);
    }
    /**
     * Returns word based on context, word forms, and count.
     * Applies replacements.
     *
     * @param owner - Parent object.
     * @param context - Context.
     * @param forms - Word form.
     * @param count - Count for plural form.
     * @param replacements - Replacements.
     * @returns Word.
     */
    get(owner, context, forms, count, replacements) {
        if (context) {
            const ref = this.contexts[context];
            if (is.not.empty(ref)) {
                const definition = this.subs[ref];
                assert.not.empty(definition, `Invalid context reference: ${this.id}.${context}`);
                return definition.get(owner, context, forms, count, replacements);
            }
        }
        for (const form of forms) {
            const definition = this.subs[form];
            if (definition)
                return definition.get(owner, context, [form], count, replacements);
        }
        if (count !== 1) {
            const definition = this.subs[count];
            if (definition)
                return definition.get(owner, context, forms, count, replacements);
        }
        if (this.sub)
            return this.sub.get(owner, context, forms, count, replacements);
        let word = {
            context,
            count,
            forms,
            replacements,
            value: this.value
        };
        word = this.applyRulesRef(word, owner);
        word = this.applyRulesRefDependent(word, owner);
        word = this.applyRulesRefSecondary(word, owner);
        word = this.applyRulesVal(word);
        word = this.applyRulesWord(word, owner);
        word = this.applyRulesWordSecondary(word, owner);
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    applyRulesRef(word, owner) {
        for (const rule of this.rulesRef) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const rule2 = a.get(rule, 2).toLowerCase();
            const key = word.replacements.get(rule1);
            assert.string(key, `Missing replacement: ${this.id}.${rule1}`);
            const word2 = owner.get(key, word.context, rule2, word.count, word.replacements);
            word = Object.assign(Object.assign({}, word), { forms: word2.forms, value: word.value.replace(rule0, word2.value) });
        }
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    applyRulesRefDependent(word, owner) {
        for (const rule of this.rulesRefDependent) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const key = word.replacements.get(rule1);
            assert.string(key, `Missing replacement: ${this.id}.${rule1}`);
            const word2 = owner.get(key, word.context, word.forms, word.count, word.replacements);
            word = Object.assign(Object.assign({}, word), { value: word.value.replace(rule0, word2.value) });
        }
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    applyRulesRefSecondary(word, owner) {
        for (const rule of this.rulesRefSecondary) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const rule2 = a.get(rule, 2).toLowerCase();
            const key = word.replacements.get(rule1);
            assert.string(key, `Missing replacement: ${this.id}.${rule1}`);
            const word2 = owner.get(key, word.context, rule2, 1, word.replacements);
            word = Object.assign(Object.assign({}, word), { value: word.value.replace(rule0, word2.value) });
        }
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @returns Modified word.
     */
    applyRulesVal(word) {
        for (const rule of this.rulesVal) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const value = word.replacements.get(rule1);
            assert.string(value, `Missing replacement: ${this.id}.${rule1}`);
            word = Object.assign(Object.assign({}, word), { value: word.value.replace(rule0, value) });
        }
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    applyRulesWord(word, owner) {
        for (const rule of this.rulesWord) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const word2 = owner.get(rule1, word.context, word.forms, word.count, word.replacements);
            word = Object.assign(Object.assign({}, word), { value: word.value.replace(rule0, word2.value) });
        }
        return word;
    }
    /**
     * Applies rules to the word.
     *
     * @param word - Word.
     * @param owner - Parent object.
     * @returns Modified word.
     */
    applyRulesWordSecondary(word, owner) {
        for (const rule of this.rulesWordSecondary) {
            const rule0 = a.get(rule, 0);
            const rule1 = a.get(rule, 1);
            const rule2 = a.get(rule, 2).toLowerCase();
            const word2 = owner.get(rule1, word.context, rule2, 1, word.replacements);
            word = Object.assign(Object.assign({}, word), { value: word.value.replace(rule0, word2.value) });
        }
        return word;
    }
}
exports.Definition = Definition;
//# sourceMappingURL=Definition.js.map