"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OGSApi = (function () {
    function OGSApi() {
    }
    OGSApi.setApiUrl = function (url) {
        console.log('OGSApi URL set to', url);
        this.API_URL = url;
    };
    return OGSApi;
}());
OGSApi.API_URL = 'https://api.opengamingsolutions.com';
exports.default = OGSApi;
//# sourceMappingURL=ogs-api.js.map