export default class Customer {
    public address1: string;
    public address2: string;
    public phone: string;
    public id: string;
    public user: IUser;
    public experienceGroups: string[];
    public account?: {
        balance: number;
        accounts: {
            [key: string]: number;
        };
        accountsMap: {
            [key: string]: string;
        }
    };
}