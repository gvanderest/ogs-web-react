interface IRecord {
    [key: string]: any;
}

interface IState {
    [key: string]: any;
}

function initialMergeFunction(existing: any, record: any) {
    return { ...existing, ...record };
}

export default function reduceRecord(
    state: IState,
    record: IRecord = {},
    mergeFunction = initialMergeFunction,
    index = "id",
    field = "byId",
) {
    const indexValue = record[index];
    const existing = state[field][indexValue];
    return {
        ...state,
        [field]: {
            ...state[field],
            [indexValue]: mergeFunction(existing, record),
        },
    };
}
