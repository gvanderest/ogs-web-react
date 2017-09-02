interface IState {
    [key: string]: any;
}

export default function deleteRecord(
    state: IState,
    record: string | IRecord,
    index = "id",
    field = "byId",
) {
    console.log("BEFORE DELETE", state, record);
    const newState = {
        ...state,
        [field]: {
            ...state[field]
        }
    };

    const id = record;
    if (typeof record === "object") {
        id = record[index];
    }
    console.log("DELETING", id);

    delete newState[field][id];
    console.log("AFTER DELETE", newState);
    return newState;
}
