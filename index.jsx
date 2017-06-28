import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux';
import { Provider as StoreProvider, connect as reactReduxConnect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import eventsReducer from './reducers/eventsReducer';
import eventGamesCollectionsReducer from './reducers/eventGamesCollectionsReducer';
import ticketsReducer from './reducers/ticketsReducer';

import * as RouterComponents from 'react-router-dom';
console.log('RouterComponents', RouterComponents);

let reducers = {
    events: eventsReducer,
    eventGamesCollections: eventGamesCollectionsReducer,
    tickets: ticketsReducer,
    routing: routerReducer
};

import * as eventsActions from './actions/eventsActions';

let actions = {
    events: eventsActions
};

const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        )
    )
);

const dispatch = store.dispatch;

const connect = reactReduxConnect((store, ownProps) => {
    return {
        store: store,
        ...ownProps
    };
}, (dispatch) => {
    return {
        dispatch,
        actions: {
            events: bindActionCreators(actions.events, dispatch)
        }
    };
});

export {
    store,
    dispatch,
    connect,
    StoreProvider,

    history,

    Router,
    Route,
    Link,
};
