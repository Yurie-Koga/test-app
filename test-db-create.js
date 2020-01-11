const sqlite = require("sqlite3").verbose();

// Open db
let dbCreate = new sqlite.Database("./db/sample.db", err => {
  if (err) console.error("*** DB ERROR (dbCreate): " + err.message);
  else console.log("+ Opened dbCreate.");
});

// Create table
dbCreate.run("CREATE TABLE langs(name text)", err => {
  if (err) console.error("*** DB ERROR (dbCreate): " + err.message);
  else console.log("Created");
});

// Close db
dbCreate.close(err => {
  if (err) console.error("*** DB ERROR (dbCreate): " + err.message);
  else console.log("- Closed dbCreate.");
});

console.log();
