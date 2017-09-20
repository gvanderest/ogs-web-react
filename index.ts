import { Provider as StoreProvider } from "react-redux";
import { Link, Route, Switch as RouteSwitch } from "react-router-dom";

import connect from "./connect";
import history from "./history";
import store from "./store";

import actions from "./actions";
import reducers from "./reducers";

import Application from "./components/Application";
import Router from "./components/Router";
import InfiniteScroll from "./components/InfiniteScroll";

import ConnectedProps from "./classes/ConnectedProps";
import Event from "./classes/Event";
import EventGamesCollection from "./classes/EventGamesCollection";
import EventPosition from "./classes/EventPosition";
import Game from "./classes/Game";
import Outcome from "./classes/Outcome";
import Player from "./classes/Player";
import Selection from "./classes/Selection";
import Team from "./classes/Team";
import Ticket from "./classes/Ticket";

export {
    // Redux
    actions,
    connect,
    store,
    reducers,
    StoreProvider,
    Application,
    ConnectedProps,

    // Router
    history,
    Router,
    Route,
    RouteSwitch,
    Link,

    // Classes
    Event,
    EventGamesCollection,
    EventPosition,
    Game,
    Outcome,
    Player,
    Selection,
    Team,
    Ticket,

    // Components
    InfiniteScroll,
};
