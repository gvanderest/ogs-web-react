import generateReducer from "../utils/generateReducer";
import reduceRecords from "../utils/reduceRecords";

import ReduxAction from "../classes/ReduxAction";
import Selection from "../classes/Selection";

import { FETCHED_SELECTIONS } from "./actions";

interface ISelectionsState {
    byId: {
        [key: string]: Selection;
    };
}

interface IHandleFetchedSelectionsAction extends ReduxAction {
    selections: Selection[];
}

function handleFetchedSelections(state: ISelectionsState, action: IHandleFetchedSelectionsAction) {
    const { selections } = action;
    return reduceRecords(state, selections);
}

export default generateReducer({
    byId: {},
}, {
    [FETCHED_SELECTIONS]: handleFetchedSelections,
});
