export default function reduceRecords(state, records=[], index='id', field='byId') {
    state = {
        ...state,
        [field]: {
            ...state[field]
        }
    };
    records.forEach((record) => {
        let indexValue = record[index];
        state[field][indexValue] = {
            ...state[field][indexValue],
            ...record
        };
    });
    return state;
}
