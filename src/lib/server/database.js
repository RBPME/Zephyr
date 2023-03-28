import mysql from 'mysql';

export var con = mysql.createConnection({
  host: "elev.vtg.dk",
  user: "ddu0823_elev_vtg",
  password: "k2jkhq31",
  database: "ddu0823_elev_vtg_dk"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});