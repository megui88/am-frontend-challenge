const express = require('express');
const Storage = require('../services/Storage');
const Hotel = require('../services/hotel');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const store = new Storage(MongoClient, config);
const service = new Hotel(store);
const router = express.Router();

router.get('/', (req, res, next) => {
    service.list(req.query.filters || {})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
    service.create(req.body)
        .then((data) => {
            res.json(data, 201);
        })
        .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
    service.findOne(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => next(err));
});

router.head('/:id', (req, res, next) => {
    service.findOne(req.params.id)
        .then(() => {
            res.json(undefined, 204);
        })
        .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
    service.update(req.params.id, req.body)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.patch('/:id', (req, res, next) => {
    service.update(req.params.id, req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
    service.delete(req.params.id, req.body)
        .then(() => {
            res.json(undefined, 204);
        })
        .catch((err) => next(err));
});

module.exports = router;
