interface IRecord {
    [key: string]: any;
}

interface IState {
    [key: string]: any;
}

export default function reduceRecord(
    state: IState,
    record: IRecord = {},
    index = "id",
    field = "byId",
) {
    const indexValue = record[index];
    return {
        ...state,
        [field]: {
            ...state[field],
            [indexValue]: {
                ...state[field][indexValue],
                ...record,
            },
        },
    };
}
