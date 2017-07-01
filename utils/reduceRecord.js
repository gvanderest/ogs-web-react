export default function reduceRecord(state, record={}, index='id', field='byId') {
    let indexValue = record[index];
    return {
        ...state,
        [field]: {
            ...state[field],
            [indexValue]: {
                ...state[field][indexValue],
                ...record
            }
        }
    };
}
