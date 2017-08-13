import Event from "./Event";

export default class Ticket {
    id: string;
    eventId: string;
    event: Event;
    amountWon: number;
    templateId: string;
    position: number; // FIXME rename to rank?
    positionTied: boolean; // FIXME rename to rankTied?
    earnedPoints: number;
}
