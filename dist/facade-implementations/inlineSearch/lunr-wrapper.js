"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = exports.Engine = void 0;
const tslib_1 = require("tslib");
const lunr_1 = (0, tslib_1.__importDefault)(require("lunr"));
const template_1 = require("./api/template");
class Engine extends template_1.Engine {
    search(query) {
        const refs = new Set(this.index.search(query).map(result => result.ref));
        return this.items.filter(item => refs.has(item[this.idField]));
    }
    /*
    |*****************************************************************************
    |* Protected
    |*****************************************************************************
    |*/
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
}
exports.Engine = Engine;
exports.implementation = (0, template_1.createImplementation)(Engine);
//# sourceMappingURL=lunr-wrapper.js.map