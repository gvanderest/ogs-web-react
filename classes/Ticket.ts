import Event from "./Event";
import Selection from "./Selection";

export default class Ticket {
    public id: string;
    public eventId: string;
    public event: Event;
    public amountWon: number;
    public templateId: string;
    public rank: number;
    public rankTied: boolean;
    public earnedPoints: number;
    public selectionIds?: string[];
    public selections?: Selection[];
    public timeUnitsRemaining?: number;
    public username?: string;
}
