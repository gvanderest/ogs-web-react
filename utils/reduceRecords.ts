interface IState {
    [key: string]: any;
}

interface IRecord {
    [key: string]: any;
}

export default function reduceRecords(state: IState, records: IRecord[] = [], index = "id", field = "byId") {
    state = {
        ...state,
        [field]: {
            ...state[field],
        },
    };
    records.forEach((record) => {
        const indexValue: string = record[index];
        state[field][indexValue] = {
            ...state[field][indexValue],
            ...record,
        };
    });
    return state;
}
