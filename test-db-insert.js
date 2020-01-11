const sqlite = require("sqlite3").verbose();

// Open db
let dbInsert = new sqlite.Database("./db/sample.db", err => {
  if (err) console.error("*** DB ERROR (dbInsert): " + err.message);
  else console.log("+ Opened dbInsert.");
});

// Insert and Select
// use "function(err) {}" instead of "err => {}" (this key word didn't work)
dbInsert.serialize(() => {
  // Insert single row
  // VALUES(?)`, ["Java"], = VALUES('Java')`
  dbInsert.run(`INSERT INTO langs(name) VALUES(?)`, ["Java"], function(err) {
    if (err) console.error("*** DB ERROR (dbInsert): " + err.message);
    else console.log(`Inserted single row. Row ID: ${this.lastID}`);
  });

  // Insert multi rows
  let langs = ["C#", "JavaScript", "Python", "Ruby"];
  // set valuese: "...VALUES('C#'), ('JavaScript'), ('Python')"
  let placeholders = langs.map(item => "(?)").join(",");
  let sql = "INSERT INTO langs(name) VALUES " + placeholders;
  console.log("* SQL: " + sql);

  dbInsert.run(sql, langs, function(err) {
    if (err) console.error("*** DB ERROR (dbInsert): " + err.message);
    else console.log(`Inserted multi rows: ${this.changes}`);
  });

  // Select
  dbInsert.each(`SELECT name FROM langs`, (err, row) => {
    if (err) throw err;
    else console.log("Greetings: " + row.name);
  });
});

// Close db
dbInsert.close(err => {
  if (err) console.error("*** DB ERROR (dbInsert): " + err.message);
  else console.log("- Closed dbInsert.");
});

console.log();
