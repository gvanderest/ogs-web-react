import Event from "./Event";
import Customer from "./Customer";
import EventGamesCollection from "./EventGamesCollection";
import Ticket from "./Ticket";
import Transaction from "./Transaction";
import Selection from "./Selection";

export default class ReduxActions {
    public auth: {
        login: (options: object) => Promise<Customer>;
    };
    public eventGamesCollections: {
        fetchEventGamesCollection: (options: object) => Promise<EventGamesCollection>;
        fetchFantasyEventGamesCollection: (options: object) => Promise<EventGamesCollection>;
    };
    public tickets: {
        fetchTicket: (options: object) => Promise<Ticket>;
        fetchTickets: (options?: object) => Promise<Ticket[]>;
    };
    public events: {
        fetchEvent: (options: object) => Promise<Event>;
        fetchEvents: (options: object) => Promise<Event[]>;
        fetchLiveEvent: (options: object) => Promise<Event>;
    };
    public routing: {
        push: (url: string) => void;
    };
    public selections: {
        fetchTicketSelections: (ticketId: string) => Promise<Selection[]>;
    };

    public transactions: {
        fetchTransactions: (options?: object) => Promise<Transaction[]>;
    };
}
