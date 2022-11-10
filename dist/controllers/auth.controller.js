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
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mailUser, passwordUser, UserNick, idPeople } = req.body;
    const user = new User_1.users();
    user.mailUser = mailUser;
    if (req.body.passwordUser) {
        user.passwordUser = yield user.encryptPassword(passwordUser);
    }
    user.UserNick = UserNick;
    user.idPeople = idPeople;
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth_token', token).json(user);
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.mailUser && req.body.passwordUser) {
            const user = yield User_1.users.findOneBy({ mailUser: req.body.mailUser });
            if (!user)
                return res.status(400).json('Email or password is wrong');
            const correctPassword = yield user.validatePassword(req.body.passwordUser);
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            res.header('auth_token', token).json(user);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.users.findOneBy({ id: parseInt(req.userId) });
    if (!user)
        return res.status(400).json('No user found');
    res.json(user);
});
exports.profile = profile;
