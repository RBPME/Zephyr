import mysql from 'mysql';

export var db = mysql.createConnection({
  host: "elev.vtg.dk",
  user: "ddu0823_elev_vtg",
  password: "k2jkhq31",
  database: "ddu0823_elev_vtg_dk"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});