"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_redux_1 = require("react-router-redux");
var history_1 = require("../history");
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Router.prototype.render = function () {
        return (react_1.default.createElement(react_router_redux_1.ConnectedRouter, { history: history_1.default }, this.props.children));
    };
    return Router;
}(react_1.default.PureComponent));
exports.default = Router;
//# sourceMappingURL=Router.js.map