import { Provider as StoreProvider } from 'react-redux';
import { Route, Link, Switch as RouteSwitch } from 'react-router-dom';

import store from './store';
import connect from './connect';
import history from './history';

import reducers from './reducers';
import actions from './actions';

import Application from './components/Application';
import Router from './components/Router';

// import OGSApi from './ogs-api';

import Event from './classes/Event';
// import IEventGamesCollection from './interfaces/IEventGamesCollection';
// import IEventPosition from './interfaces/IEventPosition';
// import IGame from './interfaces/IGame';
// import IOutcome from './interfaces/IOutcome';
// import IPlayer from './interfaces/IPlayer';
// import IReduxActions from './interfaces/IReduxActions';
// import IReduxStore from './interfaces/IReduxStore';
// import ITeam from './interfaces/ITeam';
// import ITicket from './interfaces/ITicket';

export {
    // OGSApi,

    store,
    connect,

    actions,
    reducers,

    history,

    Router,
    Route,
    RouteSwitch,
    Link,

    StoreProvider,
    Application,

    Event
};
