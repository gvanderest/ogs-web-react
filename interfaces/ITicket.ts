import IEvent from "./IEvent";

interface ITicket {
    id: string;
    eventId: string;
    event: IEvent;
    amountWon: number;
    templateId: string;
    rank: number;
    rankTied: boolean;
    earnedPoints: number;
    username?: string;
    payout?: any;
    status?: "n" | "c" | "x";
    timeUnitsRemaining?: number;
    userId?: string;
    selectionIds: string[];
    experienceGroups?: string[];
}
export default ITicket;
