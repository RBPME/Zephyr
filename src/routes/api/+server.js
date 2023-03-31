import mysql from 'mysql2';
// @ts-ignore
import { DB_HOST, DB_USER, DB_PASS, DB_BASE, API_KEY } from '$env/static/private';


const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_BASE
}).promise();

export const GET = ({ request }) => {
    const authHeader =  request.headers.get('api-key');

    if (authHeader !== API_KEY) {
        return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
    }

    return new Response(JSON.stringify({message: 'Hello World!'}), {status: 200})
}