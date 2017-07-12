import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import { routerMiddleware } from "react-router-redux";

import thunk from "redux-thunk";
import history from "./history";
import reducers from "./reducers";

interface IReduxWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => any;
    [key: string]: any;
}

const composeEnhancers: any =
    (window as IReduxWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers as any),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ) ,
    ),
);

export default store;
