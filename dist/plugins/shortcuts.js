"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const tslib_1 = require("tslib");
const jquery_1 = (0, tslib_1.__importDefault)(require("jquery"));
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const cast = (0, tslib_1.__importStar)(require("@skylib/functions/dist/converters"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
/**
 * Installs plugin.
 */
function install() {
    {
        assert.toBeFalse(installed, "Double install");
        installed = true;
    }
    (0, jquery_1.default)(document).on("keydown", (event) => {
        const candidates = (0, jquery_1.default)(".x-shortcuts-container:visible")
            .toArray()
            .map((element, index) => {
            const wrapper = (0, jquery_1.default)(element);
            return {
                element,
                index,
                priority: cast.number(wrapper.data("shortcuts-container-priority")),
                zIndex: cast.number(wrapper.css("zIndex"))
            };
        })
            .sort((x, y) => {
            if (x.priority !== y.priority)
                return y.priority - x.priority;
            if (x.zIndex !== y.zIndex)
                return y.zIndex - x.zIndex;
            return y.index - x.index;
        });
        if (candidates.length)
            for (const spec of specs)
                if (event.key === spec.key)
                    if (is.not.empty(spec.inapplicableTarget) &&
                        (0, jquery_1.default)(event.target).is(spec.inapplicableTarget)) {
                        // Inapplicable target
                    }
                    else {
                        const wrapper = (0, jquery_1.default)(a.first(candidates).element);
                        if (wrapper.is(spec.handler))
                            wrapper.trigger("click");
                        else
                            wrapper.find(spec.handler).trigger("click");
                    }
    });
}
exports.install = install;
let installed = false;
const specs = [
    {
        handler: ".x-shortcut-esc:visible",
        inapplicableTarget: undefined,
        key: "Escape"
    },
    {
        handler: ".x-shortcut-page-down:visible",
        inapplicableTarget: "textarea",
        key: "PageDown"
    },
    {
        handler: ".x-shortcut-page-up:visible",
        inapplicableTarget: "textarea",
        key: "PageUp"
    }
];
//# sourceMappingURL=shortcuts.js.map