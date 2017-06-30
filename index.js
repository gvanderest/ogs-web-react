import { Provider as StoreProvider } from 'react-redux';
import { Route, Link, Switch as RouteSwitch } from 'react-router-dom';

import store from './store';
import connect from './connect';
import history from './history';

import reducers from './reducers';
import actions from './actions';

import Application from './components/Application';
import Router from './components/Router';

import OGSApi from './ogs-api';

export {
    OGSApi,

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
    Application
};
