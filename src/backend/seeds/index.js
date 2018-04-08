const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const Storage = require('../services/Storage');
const Hotel = require('../services/hotel');
const store = new Storage(MongoClient, config);
const service = new Hotel(store);
const data = JSON.parse(fs.readFileSync(__dirname + '/data/data.json', 'utf8'));

let puts = [];
data.forEach((e) => {
    puts.push(service.create(e));
});

Promise.all(puts)
    .then(() => {
        console.log('Seeds Finish!');
        service.close();
    })
    .catch((err) => {
        throw err;
    });
