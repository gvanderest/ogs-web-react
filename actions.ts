import * as auth from "./auth/actions";
import * as customers from "./customers/actions";
import * as eventGamesCollections from "./eventGamesCollections/actions";
import * as eventPositions from "./eventPositions/actions";
import * as events from "./events/actions";
import * as games from "./games/actions";
import * as outcomes from "./outcomes/actions";
import * as players from "./players/actions";
import * as selections from "./selections/actions";
import * as systemMessages from "./systemMessages/actions";
import * as teams from "./teams/actions";
import * as templateTickets from "./templateTickets/actions";
import * as tickets from "./tickets/actions";
import * as transactions from "./transactions/actions";

import { push } from "react-router-redux";

interface IActions {
    [key: string]: {
        [moreKeys: string]: any;
    };
}

const actions: IActions = {
    auth,
    customers,
    eventGamesCollections,
    eventPositions,
    events,
    games,
    outcomes,
    players,
    routing: {
        push,
    },
    selections,
    systemMessages,
    teams,
    templateTickets,
    tickets,
    transactions,
};

export default actions;
