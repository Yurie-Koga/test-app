const sqlite = require("sqlite3").verbose();

// check access in-memory db
let db = new sqlite.Database(":memory:", err => {
  if (err) console.error(err.message);
  console.log("Connected to the in-memory SQlite database.");
});
db.close(err => {
  if (err) console.error(err.message);
  console.log("Closed db connection.");
});

// set open mode: default = sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
let db2 = new sqlite.Database(
  "./db/example.db",
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  err => {
    if (err) console.error("DB ERROR: " + err.message);
    console.log("Connected to example db.");
  }
);
db2.close(err => {
  if (err) console.error("DB ERROR: " + err.message);
  console.log("Closed db2 connection.");
});

// set open mode (ReadWrite), see error
let db3 = new sqlite.Database(
  "./db/not-exist.db",
  sqlite.OPEN_READWRITE,
  err => {
    if (err) console.error("DB ERROR: " + err.message);
    console.log("Connected to not-exist.db.");
  }
);
db3.close(err => {
  if (err) console.error("DB ERROR: " + err.message);
  console.log("Closed db3 connection.");
});
