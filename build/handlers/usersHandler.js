"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = require("../models/usersModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const creds_1 = __importDefault(require("../creds"));
const userModel = new usersModel_1.UserModel();
const listUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = _req.headers.authorization;
        const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
        if ((auth === null || auth === void 0 ? void 0 : auth.split(" ")[0].toLowerCase()) === "bearer") {
            try {
                jsonwebtoken_1.default.verify(token, creds_1.default.tokenSecret);
            }
            catch (err) {
                res.status(401);
                res.json("Authentication Failed!");
            }
            const users = yield userModel.index();
            res.json(users);
        }
        else {
            res.status(401);
            res.json("Authentication Failed!");
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = yield userModel.createUser(req.body);
        const token = jsonwebtoken_1.default.sign({ user_data: username }, creds_1.default.tokenSecret);
        res.json({ username, token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const showUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.show(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404);
            res.json("User not found.");
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const userRoutes = (app) => {
    app.post("/create_user", createUser);
    app.get("/users", listUsers);
    app.get("/user/:id", showUser);
};
exports.default = userRoutes;
