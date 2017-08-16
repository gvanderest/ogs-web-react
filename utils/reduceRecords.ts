interface IState {
    [key: string]: any;
}

interface IRecord {
    [key: string]: any;
}

function initialMergeFunction(existing: any, record: any) {
    return { ...existing, ...record };
}

export default function reduceRecords(
    state: IState,
    records: IRecord[] = [],
    mergeFunction = initialMergeFunction,
    index = "id",
    field = "byId"
) {
    state = {
        ...state,
        [field]: {
            ...state[field],
        },
    };
    records.forEach((record) => {
        const indexValue: string = record[index];
        const existing = state[field][indexValue];
        state[field][indexValue] = mergeFunction(existing, record);
    });
    return state;
}
