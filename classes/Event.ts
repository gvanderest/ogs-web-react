import Entity from "./Entity";

export default class Event extends Entity<Event> {
    public static readonly STATUS_OPEN = "o";
    public static readonly STATUS_CLOSED = "c";
    public static readonly STATUS_FINALIZED = "f";

    public adminId: string;
    public lobbySort: number;
    public lobbyTabs: string[];
    public denyGroups: string[];
    public id: string;
    public externalId: string;
    public featured: boolean;
    public description: string;
    public payout: number;
    public payoutCurrency: string;
    public status: string;
    public ticketCost: number;
    public ticketCostCurrency: string;
    public ticketMax: number;
    public ticketCount: number;
    public context: string;
    public closeTimestamp: number;
    public fetching?: boolean;
    public failed?: boolean;
    public ticketMaxPerUser: number;
    public ticketMin: number;

    public isOpen() {
        return this.status === Event.STATUS_OPEN;
    }
    public isClosed() {
        return this.status === Event.STATUS_CLOSED;
    }
    public isFinalized() {
        return this.status === Event.STATUS_FINALIZED;
    }
    public isGuaranteed() {
        return this.ticketMin === 1;
    }
    public isMultiEntry() {
        return this.ticketMaxPerUser > 1;
    }
    public isFeatured() {
        return this.featured;
    }
    public isUserCreated() {
        return !!this.adminId;
    }
}
