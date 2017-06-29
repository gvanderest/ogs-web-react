import eventsReducer from './reducers/eventsReducer';
import eventGamesCollectionsReducer from './reducers/eventGamesCollectionsReducer';
import ticketsReducer from './reducers/ticketsReducer';
import { routerReducer } from 'react-router-redux';

const reducers = {
    events: eventsReducer,
    eventGamesCollections: eventGamesCollectionsReducer,
    tickets: ticketsReducer,
    routing: routerReducer
};

export default reducers;
