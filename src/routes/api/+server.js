// @ts-nocheck
export const prerender = true;


import mysql from 'mysql';
// @ts-ignore
import { DB_HOST, DB_USER, DB_PASS, DB_BASE, API_KEY } from '$env/static/private';

let val;

const setValue = (e) => {
    val = e;
}


var db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_BASE
});
db.connect(function(err) {
    if (err) throw(err);
});

export const GET = ({ request }) => {
    const authHeader =  request.headers.get('api-key');

    if (authHeader !== API_KEY) {
        db.query("SELECT * FROM Users", function (err, result, fields) {
            if (err) throw err;
            setValue(result);
        });
        return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
    }

    return new Response(JSON.stringify({message: 'Hello World!'}), {status: 200})
}