"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minisearchWrapper = void 0;
const tslib_1 = require("tslib");
const api_1 = require("./api");
const functions_1 = require("@skylib/functions");
const minisearch_1 = tslib_1.__importDefault(require("minisearch"));
exports.minisearchWrapper = (0, api_1.createImplementation)(functions_1.fn.run(() => {
    return class Engine extends api_1.Engine {
        search(query) {
            const ids = new Set(this.index.search(query).map(result => result.id));
            return this.items.filter(item => ids.has(item[this.idField]));
        }
        buildIndex(idField, fields, items) {
            const result = new minisearch_1.default({ fields: functions_1.a.clone(fields), idField });
            result.addAll(functions_1.a.clone(items));
            return result;
        }
    };
}));
//# sourceMappingURL=minisearch-wrapper.js.map