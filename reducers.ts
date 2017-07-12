import { routerReducer as routing } from "react-router-redux";
import eventGamesCollections from "./reducers/eventGamesCollections";
import eventPositions from "./reducers/eventPositions";
import events from "./reducers/events";
import games from "./reducers/games";
import outcomes from "./reducers/outcomes";
import players from "./reducers/players";
import teams from "./reducers/teams";
import tickets from "./reducers/tickets";

const reducers = {
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
