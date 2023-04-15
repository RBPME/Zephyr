// @ts-ignore
import { DB_HOST, DB_USER, DB_PASS, DB_BASE, API_KEY } from '$env/static/private';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_BASE
}).promise();

export const actions = {
    login: async ({ request }) => {
        const form = await request.formData();
        console.log(form);
    },
    register: async ({ request }) => {
//        const [test] = await pool.query("SELECT * FROM Users");
        const form = await request.formData();

        const email = form.get('email');
        const name = form.get('user');
        const pass = form.get('pass');
        const conf = form.get('confirm');
        const remember = form.get('remember') !== null;
        const UID = crypto.randomUUID();


        const user = {
            email,
            name,
            pass,
            conf,
            remember,
            UID
        };

        

        console.log(user);
//        console.log(test);
    }
};