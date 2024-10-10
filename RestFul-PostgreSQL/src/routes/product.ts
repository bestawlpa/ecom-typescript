import express, { Request, Response } from "express";
import { pool, getProducts, getProductById } from "../db/productsDb";
import { Product } from "../interfaces/Product";


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products:Product[] = await getProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' })
  }
});

router.get('/:id', async(req: Request, res: Response)=> {
  const {id} = req.params;
  try {
    const product: Product | null = await getProductById(Number(id));
    if(!product){
     res.status(404).json({error:'Product Not Found'});
     return;
    }  
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
})

router.post('/', async (req: Request, res: Response) => {
  const {product_name, price, category_name, images, description, inventory_quantity, rating } = req.body;
  
  const newProduct: Omit<Product, 'id'> = { 
    product_name, 
    price, 
    category_name, 
    images, 
    description, 
    inventory_quantity, 
    rating 
  };

  try {
    const result = await pool.query(
      'INSERT INTO products (product_name, price, category_name, images, description, inventory_quantity, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [newProduct.product_name, newProduct.price, newProduct.category_name, newProduct.images, newProduct.description, newProduct.inventory_quantity, newProduct.rating]
    );

    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Error adding product' });
  }
})


export default router;