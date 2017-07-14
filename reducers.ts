import { routerReducer as routing } from "react-router-redux";
import auth from "./reducers/auth";
import eventGamesCollections from "./reducers/eventGamesCollections";
import eventPositions from "./reducers/eventPositions";
import events from "./reducers/events";
import games from "./reducers/games";
import outcomes from "./reducers/outcomes";
import players from "./reducers/players";
import teams from "./reducers/teams";
import tickets from "./reducers/tickets";

const reducers = {
    auth,
    eventGamesCollections,
    eventPositions,
    events,
    games,
    outcomes,
    players,
    routing,
    teams,
    tickets,
};

export default reducers;
