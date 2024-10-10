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
const productsDb_1 = require("../db/productsDb");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productsDb_1.getProducts)();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, productsDb_1.getProductById)(Number(id));
        if (!product) {
            res.status(404).json({ error: 'Product Not Found' });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, price, category_name, images, description, inventory_quantity, rating } = req.body;
    const newProduct = {
        product_name,
        price,
        category_name,
        images,
        description,
        inventory_quantity,
        rating
    };
    try {
        const result = yield productsDb_1.pool.query('INSERT INTO products (product_name, price, category_name, images, description, inventory_quantity, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [newProduct.product_name, newProduct.price, newProduct.category_name, newProduct.images, newProduct.description, newProduct.inventory_quantity, newProduct.rating]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Error adding product' });
    }
}));
exports.default = router;
