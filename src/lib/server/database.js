import mysql from 'mysql2';

console.log('test');
const pool = mysql.createConnection({
  host: "127.0.0.1",
  user: "ddu0823_elev_vtg@localhost",
  password: "k2jkhq31",
  database: "ddu0823_elev_vtg_dk"
});
//console.log(pool);

//pool.query("INSERT INTO Users VALUES ('fa2', 'RBP', 'k2jkhq31', 'rasm245r@gmail.com')");
//const [rows] = await pool.query("SELECT * FROM Users");
//console.log(rows);
