"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunrWrapper = void 0;
const tslib_1 = require("tslib");
const api_1 = require("./api");
const functions_1 = require("@skylib/functions");
const lunr_1 = tslib_1.__importDefault(require("lunr"));
exports.lunrWrapper = (0, api_1.createImplementation)(functions_1.fn.run(() => {
    return class Engine extends api_1.Engine {
        search(query) {
            const ids = new Set(this.index.search(query).map(result => result.ref));
            return this.items.filter(item => ids.has(item[this.idField]));
        }
        buildIndex(idField, fields, items) {
            return (0, lunr_1.default)((builder) => {
                builder.ref(idField);
                for (const field of fields)
                    builder.field(field);
                for (const item of items)
                    builder.add(item);
            });
        }
    };
}));
//# sourceMappingURL=lunr-wrapper.js.map