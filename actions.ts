import * as auth from "./auth/actions";
import * as customers from "./customers/actions";
import * as eventGamesCollections from "./eventGamesCollections/actions";
import * as eventPositions from "./eventPositions/actions";
import * as events from "./events/actions";
import * as games from "./games/actions";
import * as outcomes from "./outcomes/actions";
import * as players from "./players/actions";
import * as teams from "./teams/actions";
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
    teams,
    tickets,
    transactions,
};

export default actions;
