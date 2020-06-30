import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'CoronaTracker.db';
const database_version = '1.0';
const database_displayname = 'Corona Tracker Offline Database';
const database_size = 200000;

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Trace LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Trace (traceId, traceTime, traceLatitude, traceLongitude)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  initDBForInfo() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              db.executeSql('SELECT 1 FROM InfoTrace LIMIT 1')
                .then(() => {})
                .catch(error => {
                  console.log('Received error: ', error);
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS InfoTrace (InfoId, InfoLastCheck)',
                    );
                  })
                    .then(() => {
                      db.transaction(tx => {
                        tx.executeSql('INSERT INTO InfoTrace  VALUES (?, ?)', [
                          1,
                          Date.now(),
                        ]).then(([tx, results]) => {
                          resolve(results);
                        });
                      });
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  getInfo() {
    return new Promise(resolve => {
      const traces = [];
      this.initDBForInfo()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT I.InfoId, I.InfoLastCheck  FROM InfoTrace I',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {InfoId, InfoLastCheck} = row;
                traces.push({
                  InfoId,
                  InfoLastCheck,
                });
              }
              resolve(traces);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  listTrace() {
    return new Promise(resolve => {
      const traces = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT t.traceId, t.traceTime, t.traceLatitude, t.traceLongitude FROM Trace t',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {traceId, traceTime, traceLatitude, traceLongitude} = row;
                traces.push({
                  traceId: traceId,
                  traceTime: traceTime,
                  traceLatitude: traceLatitude,
                  traceLongitude: traceLongitude,
                });
              }
              resolve(traces);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  addInfo() {
    return new Promise(resolve => {
      this.initDBForInfo()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO InfoTrace VALUES (?, ?)', [
              1,
              Date.now(),
            ])
              .then(([tx, results]) => {
                console.log('done');
                resolve(results);
              })
              .catch(err => {
                console.log('NOT done');
                console.log(err);
              });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addTrace(trace) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO trace VALUES (?, ?, ?, ?)', [
              trace.traceId,
              trace.traceTime,
              trace.traceLatitude,
              trace.traceLongitude,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteProduct() {
    return new Promise(resolve => {
      this.initDBForInfo()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM InfoTrace ', []).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
