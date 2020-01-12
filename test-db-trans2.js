// ========== Note ==========
// Not completed file.
// Error @ line 62.
//  => TypeError: db.run(...).each(...).then is not a function
// ========== Note ==========
const sqlite = require("sqlite3").verbose();

let execFlg = true;
let db;

// Open db
db = new sqlite.Database("./db/testTrans.db", err => {
  if (err) console.error("*** DB ERROR (db): " + err.message);
  else console.log("+ Opened db.");
});

// Truncate db
db.run("DELETE FROM testTbl", err => {
  if (err) console.error("*** DB ERROR (db): " + err.message);
  else console.log("Truncated table");
});

// Insert
db.serialize(() => {
  // Start trans
  db.run("BEGIN TRANSACTION");

  // Create table
  db.run("CREATE TABLE IF NOT EXISTS testTbl(comment text)", err => {
    if (err) console.error("*** DB ERROR (db): " + err.message);
    else console.log("Created");
  });

  // Insert single row
  db.run(
    `INSERT INTO testTbl(comment) VALUES(?)`,
    ["Before Rollback"],
    function(err) {
      if (err) console.error("*** DB ERROR (db): " + err.message);
      else console.log(`Inserted single row. Row ID: ${this.lastID}`);
    }
  );
  db.each(`SELECT comment FROM testTbl`, (err, row) => {
    if (err) throw err;
    else console.log("First insert: " + row.comment);
  });

  // Cause error intentionally to see if Rollback works
  db.run(`INSERT INTO testTbl(comment) VALUES(?)`, ["After Rollback"], function(
    err
  ) {
    // Rollback
    // db.run("ROLLBACK");
  }).each(`SELECT comment FROM testTbl`, (err, row) => {
    if (err) throw err;
    else console.log("Second insert: " + row.comment);
  });
});

// Get result
db.each(`SELECT comment FROM testTbl`, (err, row) => {
  if (err) throw err;
  else console.log("Result: " + row.comment);
});

// Close db
db.close(err => {
  if (err) console.error("*** DB ERROR (db): " + err.message);
  else console.log("- Closed db.");
});

console.log();
