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
function reduceRecord(state, record, index, field) {
    if (record === void 0) { record = {}; }
    if (index === void 0) { index = 'id'; }
    if (field === void 0) { field = 'byId'; }
    var indexValue = record[index];
    return __assign({}, state, (_a = {}, _a[field] = __assign({}, state[field], (_b = {}, _b[indexValue] = __assign({}, state[field][indexValue], record), _b)), _a));
    var _a, _b;
}
exports.default = reduceRecord;
//# sourceMappingURL=reduceRecord.js.map