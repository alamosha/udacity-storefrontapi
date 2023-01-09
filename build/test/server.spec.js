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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const usersModel_1 = require("../models/usersModel");
const database_1 = __importDefault(require("../database"));
const req = (0, supertest_1.default)(server_1.default);
let token = "";
const userModel = new usersModel_1.UserModel();
describe("Testing API endpoints", () => {
    it("Get / Endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get("/");
        expect(response.statusCode).toBe(200);
    }));
    const user = {
        username: "alam_othman",
        first_name: "Alam",
        last_name: "Othman",
        password: "MySuperSecurePassword",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testUser = yield userModel.createUser(user);
    }));
    it("test /create_user Endpoint [POST]", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req
            .post("/create_user")
            .set("Content-Type", "application/json")
            .send({
            first_name: "Test Post",
            last_name: "User",
            username: "post_user",
            password: "password12",
        });
        token = response.body.token;
        expect(response.status).toBe(200);
        expect(response.body.username.first_name).toBe("Test Post");
        expect(response.body.username.last_name).toBe("User");
        expect(response.body.username.username).toBe("post_user");
    }));
    it("Test /users Endpoint [GET]", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get("/users").set("Authorization", "Bearer " + token);
        expect(res.status).toBe(200);
    }));
    it('Test /user/:id Endpoint [GET]', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/user/2').set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('post_user');
        expect(res.body.first_name).toBe('Test Post');
        expect(res.body.last_name).toBe('User');
        console.log(res.body);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
        yield conn.query(sql);
        conn.release();
    }));
});
