import Selection from "./Selection";
import Ticket from "./Ticket";
import EventGamesCollection from "./EventGamesCollection";

export default class TemplateTicket {
    public id: string;
    public externalId: string;
    public eventGamesCollection?: EventGamesCollection;
    public closeTimestamp: number;
    public selections?: Selection[];
    public selectionIds: string[];
    public context: string;
    public modifiedTimestamp: number;
    public ticketIds: string[];
    public tickets?: Ticket[];
}