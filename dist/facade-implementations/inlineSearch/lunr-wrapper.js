"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const lunr_1 = tslib_1.__importDefault(require("lunr"));
const api_1 = require("./api");
exports.implementation = (0, api_1.createImplementation)(functions_1.fn.run(() => class Engine extends api_1.Engine {
    search(query) {
        const refs = new Set(this.index.search(query).map(result => result.ref));
        return this.items.filter(item => refs.has(item[this.idField]));
    }
    buildIndex(idField, fields, items) {
        return (0, lunr_1.default)(configFunction);
        function configFunction(builder) {
            builder.ref(idField);
            for (const field of fields)
                builder.field(field);
            for (const item of items)
                builder.add(item);
        }
    }
}));
//# sourceMappingURL=lunr-wrapper.js.map