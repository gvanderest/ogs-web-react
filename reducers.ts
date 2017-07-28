import { routerReducer as routing } from "react-router-redux";

import auth from "./auth/reducer";
import customers from "./customers/reducer";
import eventGamesCollections from "./eventGamesCollections/reducer";
import eventPositions from "./eventPositions/reducer";
import events from "./events/reducer";
import games from "./games/reducer";
import outcomes from "./outcomes/reducer";
import players from "./players/reducer";
import teams from "./teams/reducer";
import tickets from "./tickets/reducer";
import transactions from "./transactions/reducer";

const reducers = {
    auth,
    customers,
    eventGamesCollections,
    eventPositions,
    events,
    games,
    outcomes,
    players,
    routing,
    teams,
    tickets,
    transactions,
};

export default reducers;
