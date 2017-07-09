import events from './reducers/events';
import eventGamesCollections from './reducers/eventGamesCollections';
import eventPositions from './reducers/eventPositions';
import games from './reducers/games';
import outcomes from './reducers/outcomes';
import players from './reducers/players';
import teams from './reducers/teams';
import tickets from './reducers/tickets';
import { routerReducer as routing } from 'react-router-redux';

const reducers = {
    events,
    eventGamesCollections,
    eventPositions,
    games,
    outcomes,
    players,
    teams,
    tickets,
    routing
};

export default reducers;
