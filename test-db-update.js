const sqlite = require("sqlite3").verbose();

// Open db
let dbUpdate = new sqlite.Database("./db/sample.db", err => {
  if (err) console.error("*** DB ERROR (dbUpdate): " + err.message);
  else console.log("+ Opened dbUpdate.");
});

// Update and Select
dbUpdate.serialize(() => {
  // data = [SET value, WHERE value]
  let data = ["C++", "C"]; // "C" will be "C++"
  let sql = `UPDATE langs
            SET name = ?
            WHERE name = ?`;
  dbUpdate.run(sql, data, function(err) {
    if (err) console.error("*** DB ERROR (dbUpdate): " + err.message);
    else console.log(`Updated rows: ${this.changes}`);
  });

  dbUpdate.each(`SELECT name FROM langs`, (err, row) => {
    if (err) throw err;
    else console.log("Languages: " + row.name);
  });
});

// Close db
dbUpdate.close(err => {
  if (err) console.error("*** DB ERROR (dbUpdate): " + err.message);
  else console.log("- Closed dbUpdate.");
});

console.log();
