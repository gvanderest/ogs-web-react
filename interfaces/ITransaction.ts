interface ITransaction {
    amount: number;
    closed: boolean;
    createdTimestamp: number;
    currency: string;
    description: string;
    externalId: string;
    id: string;
    name: string;
    paid: boolean;
}
export default ITransaction;
