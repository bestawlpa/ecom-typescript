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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = exports.pool = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'testPgs',
    host: 'localhost',
    database: 'myDatabase',
    password: 'test1234',
    port: 5432,
});
exports.pool = pool;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM products');
    return result.rows;
});
exports.getProducts = getProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM products WHERE id = ' + id);
    return result.rows[0] || null;
});
exports.getProductById = getProductById;
process.on('exit', () => {
    console.log('Closing database connection...');
    pool.end(); // ปิดการเชื่อมต่อ pool เมื่อกระบวนการจะสิ้นสุด
});
