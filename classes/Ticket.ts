import Event from "./Event";

export default class Ticket {
    public id: string;
    public eventId: string;
    public event: Event;
    public amountWon: number;
    public templateId: string;
    public rank: number;
    public rankTied: boolean;
    public earnedPoints: number;
}
