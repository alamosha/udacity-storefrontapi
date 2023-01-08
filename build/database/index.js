"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const creds_1 = __importDefault(require("../creds"));
const pool = new pg_1.Pool({
    host: creds_1.default.host,
    port: parseInt(creds_1.default.dbPort),
    database: creds_1.default.database,
    user: creds_1.default.user,
    password: creds_1.default.pass,
    max: 4
});
exports.default = pool;
