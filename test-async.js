// ========== Note ==========
// Not completed file to check transaction.
// Using co and promise.
// co doen't work to control serialized process.
// ========== Note ==========
const sqlite = require("sqlite3").verbose();
const co = require("co"); // serialize process
let execFlg = true;
let db;

// ========== Run ==========
openDB()
  .then(truncateTbl())
  .then(response => {
    // Start trans
    db.exec("BEGIN TRANSACTION");
  })
  .then(insertDB())
  .then(response => {
    // Commit or Rollback: will be rollback
    if (execFlg) {
      console.log("execFlg= " + execFlg + ", Commit");
      db.exec("COMMIT");
    } else {
      console.log("execFlg= " + execFlg + ", Rollback");
      db.exec("ROLLBACK");
    }
  })
  .then(getResultData())
  .then(closeDB())
  .then(response => {
    console.log();
  });

co(function*() {
  yield openDB();
  yield truncateTbl();
  console.log("end point");
});

// ========== Function ==========
function openDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite.Database("./db/testTrans.db", err => {
      if (err) console.error("*** DB ERROR (db): " + err.message);
      else console.log("+ Opened db.");
    });
    resolve();
  });
}

function truncateTbl() {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM testTbl", err => {
      if (err) console.error("*** DB ERROR (db): " + err.message);
      else console.log("Truncated table");
    });
    resolve();
  });
}

function insertDB() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
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
      db.run(
        `INSERT INTO testTbl(comment) VALUES(?)`,
        ["After Rollback"],
        function(err) {
          // Cause error
          execFlg = false;

          if (err) console.error("*** DB ERROR (db): " + err.message);
          else console.log(`Inserted multi rows: ${this.changes}`);
        }
      );
      db.each(`SELECT comment FROM testTbl`, (err, row) => {
        if (err) throw err;
        else console.log("Second insert: " + row.comment);
      });
    });
    resolve();
  });
}

function getResultData() {
  return new Promise((resolve, reject) => {
    db.each(`SELECT comment FROM testTbl`, (err, row) => {
      if (err) throw err;
      else console.log("Result: " + row.comment);
    });
    resolve();
  });
}

function closeDB() {
  return new Promise((resolve, reject) => {
    db.close(err => {
      if (err) console.error("*** DB ERROR (db): " + err.message);
      else console.log("- Closed db.");
    });
    resolve();
  });
}
