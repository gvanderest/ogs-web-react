import Entity from "./Entity";
import User from "./User";

export default class Customer extends Entity<Customer> {
    public address1: string;
    public address2: string;
    public phone: string;
    public id: string;
    public user: User;
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