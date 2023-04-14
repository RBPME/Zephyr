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
  db.query("INSERT INTO Users (id, name, pass, email) VALUES ('1', 'Rasmus', '1234', 'email@gmail.com')", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  db.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});