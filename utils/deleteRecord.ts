interface IRecord {
    [key: string]: any;
};

interface IState {
    [key: string]: any;
}

export default function deleteRecord(
    state: IState,
    record: IRecord,
    index = "id",
    field = "byId",
) {
    const newState: any  = {
        ...state,
        [field]: {
            ...state[field]
        }
    };

    let id = null;

    if (record && record[index]) {
        id = record[index];
        if (newState && newState[field] && newState[field][id]) {
            delete newState[field][id];
        }
    }

    return newState;
}
