"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var redux_thunk_1 = require("redux-thunk");
var reducers_1 = require("./reducers");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var store = redux_1.createStore(redux_1.combineReducers(reducers_1.default), composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default, react_router_redux_1.routerMiddleware(history))));
exports.default = store;
//# sourceMappingURL=store.js.map