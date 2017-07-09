"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduceRecord_1 = require("../utils/reduceRecord");
var reduceRecords_1 = require("../utils/reduceRecords");
var generateReducer_1 = require("../utils/generateReducer");
var outcomes_1 = require("../actions/outcomes");
function handleFetchedOutcomes(state, action) {
    var outcomes = action.outcomes;
    return reduceRecords_1.default(state, outcomes);
}
function handleFetchedOutcome(state, action) {
    var outcome = action.outcome;
    return reduceRecord_1.default(state, outcome);
}
exports.default = generateReducer_1.default({
    byId: {}
}, (_a = {},
    _a[outcomes_1.FETCHED_OUTCOME] = handleFetchedOutcome,
    _a[outcomes_1.FETCHED_OUTCOMES] = handleFetchedOutcomes,
    _a));
var _a;
//# sourceMappingURL=outcomes.js.map