"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var securitySetup = function (app, express) {
    return app
        .use((0, cors_1.default)())
        .use(express.json());
};
exports.default = securitySetup;
