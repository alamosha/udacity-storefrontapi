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
const usersModel_1 = require("../../models/usersModel");
const database_1 = __importDefault(require("../../database"));
const userModel = new usersModel_1.UserModel();
describe("Users Model Testing", () => {
    describe("Users model class objects existence", () => {
        it("Check for index model", () => {
            expect(userModel.index).toBeDefined();
        });
        it("Check for create new user model", () => {
            expect(userModel.createUser).toBeDefined();
        });
        it("Check for get a single user model", () => {
            expect(userModel.show).toBeDefined();
        });
    });
    describe("Users models functionality", () => {
        const user = {
            username: "alam_othman",
            first_name: "Alam",
            last_name: "Othman",
            password: "MySuperSecurePassword",
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const testUser = yield userModel.createUser(user);
        }));
        it("Testing Create User model", () => __awaiter(void 0, void 0, void 0, function* () {
            const secondUser = {
                username: "test_user",
                first_name: "Test",
                last_name: "User",
                password: "MySuperSecurePassword",
            };
            const createdUser = yield userModel.createUser(secondUser);
            expect(createdUser.id).toBe(2);
            expect(createdUser.username).toBe("test_user");
            expect(createdUser.first_name).toBe("Test");
            expect(createdUser.last_name).toBe("User");
        }));
        it("testing index users model", () => __awaiter(void 0, void 0, void 0, function* () {
            const indexUsers = yield userModel.index();
            expect(indexUsers.length).toBe(2);
        }));
        it("testing Show users model", () => __awaiter(void 0, void 0, void 0, function* () {
            const showUsers = yield userModel.show("1");
            expect(showUsers.first_name).toBe("Alam");
            expect(showUsers.last_name).toBe("Othman");
            expect(showUsers.username).toBe("alam_othman");
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
            yield conn.query(sql);
            conn.release();
        }));
    });
});
