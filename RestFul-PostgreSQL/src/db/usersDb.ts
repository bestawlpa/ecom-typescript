import { Pool } from 'pg';
import { User } from '../interfaces/User';

const pool = new Pool({
    user: 'testPgs',
    host: 'localhost',
    database: 'myDatabase',
    password: 'test1234',
    port: 5432,
});

const getUsers = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows
}

const getUserById = async (id:number): Promise<User> => {
    const result = await pool.query('SELECT * FROM users WHERE id = '+ id);
    return result.rows[0]
}

process.on('exit', () => {
  console.log('Closing database connection...');
  pool.end(); // ปิดการเชื่อมต่อ pool เมื่อกระบวนการจะสิ้นสุด
});

export { pool, getUsers, getUserById };