"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var connect = react_redux_1.connect(function (store, ownProps) {
    return __assign({ store: store }, ownProps);
}, function (dispatch) {
    var props = {
        dispatch: dispatch,
        actions: {}
    };
    Object.keys(actions_1.default).forEach(function (name) {
        props.actions[name] = redux_1.bindActionCreators(actions_1.default[name], dispatch);
    });
    return props;
});
exports.default = connect;
//# sourceMappingURL=connect.js.map