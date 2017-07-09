"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function reduceRecords(state, records, index, field) {
    if (records === void 0) { records = []; }
    if (index === void 0) { index = 'id'; }
    if (field === void 0) { field = 'byId'; }
    state = __assign({}, state, (_a = {}, _a[field] = __assign({}, state[field]), _a));
    records.forEach(function (record) {
        var indexValue = record[index];
        state[field][indexValue] = __assign({}, state[field][indexValue], record);
    });
    return state;
    var _a;
}
exports.default = reduceRecords;
//# sourceMappingURL=reduceRecords.js.map