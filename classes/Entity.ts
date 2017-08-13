export default class Entity<T> {
    public constructor(data: T) {
        if (data) {
            for (const key of Object.keys(data)) {
                this[key] = data[key];
            }
        }
    }
}
