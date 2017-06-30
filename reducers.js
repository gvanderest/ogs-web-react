import events from './reducers/events';
import eventGamesCollections from './reducers/eventGamesCollections';
import tickets from './reducers/tickets';
import { routerReducer as routing } from 'react-router-redux';

const reducers = {
    events,
    eventGamesCollections,
    tickets,
    routing
};

export default reducers;
