import Customer from "./Customer";
import Event from "./Event";
import EventGamesCollection from "./EventGamesCollection";
import Ticket from "./Ticket";
import Outcome from "./Outcome";
import EventPosition from "./EventPosition";
import Game from "./Game";
import Selection from "./Selection";
import Team from "./Team";
import Player from "./Player";
import Transaction from "./Transaction";
import TemplateTicket from "./TemplateTicket";

export default class ReduxStore {
    public auth: {
        customerId: string;
    };
    public customers: {
        byId: {
            [key: string]: Customer;
        };
    };
    public eventGamesCollections: {
        byId: {
            [key: string]: EventGamesCollection;
        };
    };
    public events: {
        byId: {
            [key: string]: Event;
        };
    };
    public tickets: {
        byId: {
            [key: string]: Ticket;
        };
    };
    public outcomes: {
        byId: {
            [key: string]: Outcome;
        };
    };
    public eventPositions: {
        byId: {
            [key: string]: EventPosition;
        };
    };
    public games: {
        byId: {
            [key: string]: Game;
        };
    };
    public teams: {
        byId: {
            [key: string]: Team;
        };
    };
    public players: {
        byId: {
            [key: string]: Player;
        };
    };
    public selections: {
        byId: {
            [key: string]: Selection;
        };
    };
    public transactions: {
        byId: {
            [key: string]: Transaction;
        };
    };
    public templateTickets: {
        byId: {
            [key: string]: TemplateTicket;
        };
    };
}
