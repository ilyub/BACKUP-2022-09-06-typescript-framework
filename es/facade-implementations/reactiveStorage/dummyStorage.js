import * as fn from "@skylib/functions/es/function";
export const implementation = fn.run(() => {
    function dummyStorage(data) {
        return data;
    }
    dummyStorage.withChangesHandler = (data) => data;
    return dummyStorage;
});
//# sourceMappingURL=dummyStorage.js.map