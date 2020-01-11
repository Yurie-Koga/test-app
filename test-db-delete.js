const sqlite = require("sqlite3").verbose();

// Open db
let dbDelete = new sqlite.Database("./db/sample.db", err => {
  if (err) console.error("*** DB ERROR (dbDelete): " + err.message);
  else console.log("+ Opened dbDelete.");
});

// Delete and Select
dbDelete.serialize(() => {
  let id = 10;
  dbDelete.run(`DELETE FROM langs WHERE rowid = ?`, id, function(err) {
    if (err) console.error("*** DB ERROR (dbDelete): " + err.message);
    else console.log(`Deleted rows: ${this.changes}`);
  });

  dbDelete.each(`SELECT name FROM langs`, (err, row) => {
    if (err) throw err;
    else console.log("Languages: " + row.name);
  });
});

// Close db
dbDelete.close(err => {
  if (err) console.error("*** DB ERROR (dbDelete): " + err.message);
  else console.log("- Closed dbDelete.");
});

console.log();
