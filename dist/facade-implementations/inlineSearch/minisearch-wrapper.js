"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = exports.Engine = void 0;
const tslib_1 = require("tslib");
const minisearch_1 = (0, tslib_1.__importDefault)(require("minisearch"));
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const template_1 = require("./api/template");
class Engine extends template_1.Engine {
    search(query) {
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
    /*
    |*****************************************************************************
    |* Protected
    |*****************************************************************************
    |*/
    buildIndex(idField, fields, items) {
        const result = new minisearch_1.default({ fields: a.clone(fields), idField });
        result.addAll(a.clone(items));
        return result;
    }
}
exports.Engine = Engine;
exports.implementation = (0, template_1.createImplementation)(Engine);
//# sourceMappingURL=minisearch-wrapper.js.map