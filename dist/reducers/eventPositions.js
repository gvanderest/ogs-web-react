"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduceRecord_1 = require("../utils/reduceRecord");
var reduceRecords_1 = require("../utils/reduceRecords");
var generateReducer_1 = require("../utils/generateReducer");
var eventPositions_1 = require("../actions/eventPositions");
function handleFetchedEventPositions(state, action) {
    var eventPositions = action.eventPositions;
    return reduceRecords_1.default(state, eventPositions);
}
function handleFetchedEventPosition(state, action) {
    var eventPosition = action.eventPosition;
    return reduceRecord_1.default(state, eventPosition);
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[eventPositions_1.FETCHED_EVENT_POSITION] = handleFetchedEventPosition,
    _a[eventPositions_1.FETCHED_EVENT_POSITIONS] = handleFetchedEventPositions,
    _a));
var _a;
//# sourceMappingURL=eventPositions.js.map