import express, { Request, Response} from "express"
import { pool, getUsers, getUserById } from "../db/usersDb"
import { User } from "../interfaces/User"
import bcrypt from 'bcrypt'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users:User[] = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
})

router.get('/:id', async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user:User = await getUserById(Number(id));
        if (!user) {
            res.status(404).json({error:'User Not Found'});
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/', async (req: Request, res: Response) => {
    const { username, email, password, role} = req.body;
    const newUser: Omit<User, 'id'> = {
        username,
        email,
        password,
        role: role || 'user'   
    };

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', 
            [newUser.username, newUser.email, hashedPassword, newUser.role]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error register' });
    }

});

export default router