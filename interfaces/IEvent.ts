interface IEvent {
    adminId: string;
    lobbySort?: number;
    lobbyTabs?: string[];
    denyGroups: string[];
    id: string;
    externalId: string;
    featured: boolean;
    description: string;
    payout: number;
    payoutCurrency: string;
    status: string;
    ticketCost: number;
    ticketCostCurrency: string;
    ticketMax: number;
    ticketCount: number;
    context: string;
    closeTimestamp: number;
    fetching?: boolean;
    failed?: boolean;
    ticketMaxPerUser: number;
    ticketMin: number;
    ticketIds?: string[];
}
export default IEvent;
