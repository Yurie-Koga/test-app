// ========== Note ==========
// Using prepare/finalize to control transaction.
// ========== Note ==========
const sqlite = require("sqlite3").verbose();

let execFlg = false; // true: Commit, false: Rollback

// Open db
let db = new sqlite.Database("./db/testTrans.db", err => {
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
  db.exec("BEGIN TRANSACTION");

  // Create table
  db.run("CREATE TABLE IF NOT EXISTS testTbl(comment text)", err => {
    if (err) console.error("*** DB ERROR (db): " + err.message);
    else console.log("Created");
  });

  // Set insert data
  let stmt = db.prepare("INSERT INTO testTbl(comment) VALUES(?)");
  stmt.run("Test Data");
  stmt.finalize();

  // Commit or Rollback
  if (execFlg) db.exec("COMMIT");
  else db.exec("ROLLBACK");
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
