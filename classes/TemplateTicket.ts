import ITemplateTicket from "../interfaces/ITemplateTicket";
import Entity from "./Entity";
import EventGamesCollection from "./EventGamesCollection";
import Selection from "./Selection";
import Ticket from "./Ticket";

export default class TemplateTicket extends Entity<ITemplateTicket> implements ITemplateTicket {
    public id: string;
    public externalId: string;
    public eventGamesCollection?: EventGamesCollection;
    public selections?: Selection[];
    public selectionIds: string[];
    public modifiedTimestamp: number;
    public ticketIds: string[];
    public tickets?: Ticket[];
    public eventGamesId: string;
}
