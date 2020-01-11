const sqlite = require("sqlite3").verbose();

// check access in-memory db
<<<<<<< HEAD
let db1 = new sqlite.Database(":memory:", err => {
  if (err) console.error("*** DB ERROR (db1): " + err.message);
  else console.log("+ Opened db1.");
});
db1.close(err => {
  if (err) console.error(err.message);
  else console.log("- Closed db1.");
=======
let db = new sqlite.Database(":memory:", err => {
  if (err) console.error(err.message);
  console.log("Connected to the in-memory SQlite database.");
});
db.close(err => {
  if (err) console.error(err.message);
  console.log("Closed db connection.");
>>>>>>> 63becf0a3e73db49fdb2b0a605572212af341934
});

// set open mode: default = sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
let db2 = new sqlite.Database(
  "./db/example.db",
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  err => {
<<<<<<< HEAD
    if (err) console.error("*** DB ERROR (db2): " + err.message);
    else console.log("+ Opened db2.");
  }
);
db2.close(err => {
  if (err) console.error("*** DB ERROR (db2): " + err.message);
  else console.log("- Closed db2.");
=======
    if (err) console.error("DB ERROR: " + err.message);
    console.log("Connected to example db.");
  }
);
db2.close(err => {
  if (err) console.error("DB ERROR: " + err.message);
  console.log("Closed db2 connection.");
>>>>>>> 63becf0a3e73db49fdb2b0a605572212af341934
});

// set open mode (ReadWrite), see error
let db3 = new sqlite.Database(
  "./db/not-exist.db",
  sqlite.OPEN_READWRITE,
  err => {
<<<<<<< HEAD
    if (err) console.error("*** DB ERROR (db3): " + err.message);
    else console.log("+ Opened db3.");
  }
);
db3.close(err => {
  if (err) console.error("*** DB ERROR (db3): " + err.message);
  else console.log("- Closed db3.");
});

// test serialize: control method calls order (Create -> Insert -> Select)
let db4 = new sqlite.Database(":memory:", err => {
  if (err) console.error("*** DB ERROR (db4): " + err.message);
  else console.log("+ Opened db4.");
});
db4.serialize(() => {
  db4
    .run("CREATE TABLE greetings(message text)")
    .run(
      `INSERT INTO greetings(message)
        VALUES('Hi'),
              ('Hello'),
              ('Hey')`
    )
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err) throw err;
      else console.log("Greetings: " + row.message);
    });
});
db4.close(err => {
  if (err) console.error("*** DB ERROR (db4): " + err.message);
  else console.log("- Closed db4.");
});

console.log();
=======
    if (err) console.error("DB ERROR: " + err.message);
    console.log("Connected to not-exist.db.");
  }
);
db3.close(err => {
  if (err) console.error("DB ERROR: " + err.message);
  console.log("Closed db3 connection.");
});
>>>>>>> 63becf0a3e73db49fdb2b0a605572212af341934
