import { Provider as StoreProvider } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import store from './store';
import connect from './connect';
import history from './history';

import reducers from './reducers';
import actions from './actions';

import Application from './components/Application';
import Router from './components/Router';

export {
    store,
    connect,

    actions,
    reducers,

    history,

    Router,
    Route,
    Link,

    StoreProvider,
    Application
};
