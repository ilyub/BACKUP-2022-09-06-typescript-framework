import $ from "jquery";
import * as a from "@skylib/functions/es/array";
import * as assert from "@skylib/functions/es/assertions";
import * as cast from "@skylib/functions/es/converters";
import * as is from "@skylib/functions/es/guards";
/**
 * Installs plugin.
 */
export function install() {
    {
        assert.toBeFalse(installed, "Double install");
        installed = true;
    }
    $(document).on("keydown", (event) => {
        const candidates = $(".x-shortcuts-container:visible")
            .toArray()
            .map((element, index) => {
            const wrapper = $(element);
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
                        $(event.target).is(spec.inapplicableTarget)) {
                        // Inapplicable target
                    }
                    else {
                        const wrapper = $(a.first(candidates).element);
                        if (wrapper.is(spec.handler))
                            wrapper.trigger("click");
                        else
                            wrapper.find(spec.handler).trigger("click");
                    }
    });
}
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