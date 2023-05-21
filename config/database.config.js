'use strict';

function initDatabase() {

    const db = require('mongoose');

    const DB_URI = process.env.MONGODB_URI;

    return new Promise((resolve, reject) => {
        db.connect(
            DB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true })
            .then(_db => {
                if (process.env.APP_ENV === "development") {
                    console.info('connected to mongodb');
                }
                resolve([_db, true]);
            })
            .catch(error => {
                if (error) {
                    console.log('could not connect to mongo db -', error);
                }
                return resolve(false);
            });
    })
}

module.exports = initDatabase;
