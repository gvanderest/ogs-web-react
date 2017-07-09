export interface IEvent {
    id: string;
    externalId: string;
    description: string;
    payout: number;
    ticketCost: number;
    ticketMax: number;
    ticketCount: number;
    context: string;
    closeTimestamp: number;
    fetching: boolean;
    failed: boolean;
    ticketMaxPerUser: number;
    ticketMin: number;
}
