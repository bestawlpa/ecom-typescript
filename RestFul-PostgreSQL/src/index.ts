import express, { Request, Response, NextFunction }  from "express";
import productRoutes from './routes/product'
import userRoutes from './routes/user';


const app = express();
const port = 3030;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173/'); // กำหนดโดเมนที่อนุญาต
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // กำหนดวิธีที่อนุญาต
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // กำหนด header ที่อนุญาต
  next(); // ไปยัง middleware ถัดไป
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Shoppa API!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

export default app;