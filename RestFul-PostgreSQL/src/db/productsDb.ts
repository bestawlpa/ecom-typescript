import { Pool } from 'pg';
import { Product } from '../interfaces/Product';

const pool = new Pool({
    user: 'testPgs',
    host: 'localhost',
    database: 'myDatabase',
    password: 'test1234',
    port: 5432,
});


const getProducts = async (): Promise<Product[]> => {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
};

const getProductById = async (id: number): Promise<Product | null> => {
  const result = await pool.query('SELECT * FROM products WHERE id = ' + id);
  return result.rows[0] || null;
}
 
process.on('exit', () => {
  console.log('Closing database connection...');
  pool.end(); // ปิดการเชื่อมต่อ pool เมื่อกระบวนการจะสิ้นสุด
});

export { pool, getProducts, getProductById };