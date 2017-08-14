interface IBaseEntity {
    [key: string]: any;
}

export default class Entity<T extends IBaseEntity> {
    public constructor(data?: T) {
        if (data) {
            for (const key of Object.keys(data)) {
                this[key] = data[key];
            }
        }
    }
}
