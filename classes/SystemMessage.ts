export default class SystemMessage {
    public endTimestamp: number;
    public id: string;
    public message: string;
    public settings: {
        [key: string]: string;
    };
    public startTimestamp: number;
}