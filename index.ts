import { Provider as StoreProvider } from "react-redux";
import { Link, Route, Switch as RouteSwitch } from "react-router-dom";

import connect from "./connect";
import history from "./history";
import store from "./store";

import actions from "./actions";
import reducers from "./reducers";

import Application from "./components/Application";
import Router from "./components/Router";

export {
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
};
