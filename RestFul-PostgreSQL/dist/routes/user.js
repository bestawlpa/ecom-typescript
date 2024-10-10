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
const express_1 = __importDefault(require("express"));
const usersDb_1 = require("../db/usersDb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersDb_1.getUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, usersDb_1.getUserById)(Number(id));
        if (!user) {
            res.status(404).json({ error: 'User Not Found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const newUser = {
        username,
        email,
        password,
        role: role || 'user'
    };
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const result = yield usersDb_1.pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [newUser.username, newUser.email, hashedPassword, newUser.role]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error register' });
    }
}));
exports.default = router;
