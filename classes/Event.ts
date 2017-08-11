const STATUS_OPEN = "o";
const STATUS_CLOSED = "c";
const STATUS_FINALIZED = "f";

export default class Event {
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

    public constructor(data?: Event) {
        if (data) {
            for (const key of Object.keys(data)) {
                this[key] = data[key];
            }
        }
    }

    public isOpen() {
        return this.status === STATUS_OPEN;
    }
    public isClosed() {
        return this.status === STATUS_CLOSED;
    }
    public isFinalized() {
        return this.status === STATUS_FINALIZED;
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
