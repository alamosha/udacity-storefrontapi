"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const creds_1 = __importDefault(require("./creds"));
// import db from "./database";
const app = (0, express_1.default)();
const port = parseInt(creds_1.default.port);
app.get('/', (_req, res) => {
    // console.log(req);
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Server is now operational on port ${port}`);
});
exports.default = app;
