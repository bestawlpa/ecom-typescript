"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const port = 3030;
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use('/api/products', product_1.default);
app.use('/api/users', user_1.default);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173/'); // กำหนดโดเมนที่อนุญาต
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // กำหนดวิธีที่อนุญาต
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // กำหนด header ที่อนุญาต
    next(); // ไปยัง middleware ถัดไป
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.get('/', (req, res) => {
    res.send('Welcome to the Shoppa API!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
