/**
 * Class Hotel services
 */
class Hotel {
    /**
     * @param {Storage} storage
     */
    constructor(storage) {
        this.collection = null;
        this.storage = storage;
    }

    /**
     * @return {Object}
     */
    getCollection() {
        return new Promise((resolv, reject) => {
            if (this.collection !== null) {
                resolv(this.collection);
            }
            this.storage.getCollection().then((coll) => {
                this.collection = coll;
                resolv(this.collection);
            }).catch((err) => reject(err));
        });
    }

    /**
     * @param {Object} filters
     * @return {Promise}
     */
    list(filters) {
        filters = this.parseFilters(filters);
        return new Promise((resolv, reject) => {
            this.getCollection().then((collection) => {
                collection.find(filters).toArray((err, result) => {
                    if (err) return reject(err);
                    resolv(result.map((hotel) => {
                        delete hotel._id;
                        return hotel;
                    }));
                });
            });
        });
    }

    /**
     * @todo Fast fix, it requires more complexity
     * @param {Object} filters
     * @return {Object}
     */
    parseFilters(filters) {
        // eslint-disable-next-line guard-for-in
        for (let key in filters) {
            if (parseInt(filters[key])) {
                filters[key] = parseInt(filters[key]);
                continue;
            }
            if (Array.isArray(filters[key])) {
                continue;
            }
            filters[key] = new RegExp('.*' + filters[key], 'i');
        }
        return filters;
    }

    /**
     * @param {int} id
     * @return {Promise}
     */
    findOne(id) {
        return new Promise((resolv, reject) => {
            this.getCollection().then((coll) => {
                coll.findOne({id: id})
                    .then((hotel) => {
                        if (hotel === null) {
                            return reject({
                                status: 404,
                                message: 'Not Found',
                            });
                        }
                        delete hotel._id;
                        resolv(hotel);
                    })
                    .catch((err) => reject(err));
            });
        });
    }

    /**
     * @param {int} id
     * @return {Promise}
     */
    delete(id) {
        return new Promise((resolv, reject) => {
            this.getCollection().then((coll) => {
                coll.deleteOne({id: id})
                    .then(() => {
                        resolv();
                    })
                    .catch((err) => reject(err));
            });
        });
    }

    /**
     * @todo SET ID, requires logic of autoincrement
     * @param {Object} newHotel
     * @return {Promise}
     */
    create(newHotel) {
        return new Promise((resolv, reject) => {
            this.getCollection()
                .then((coll) => {
                    coll.insertOne(newHotel)
                        .then(() => {
                            resolv(newHotel);
                        })
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * @param {int} id
     * @param {Object} newHotel
     * @return {Promise}
     */
    update(id, newHotel) {
        return new Promise((resolv, reject) => {
            this.findOne(id)
                .then((hotel) => {
                    hotel = this.setProperties(hotel, newHotel);
                    this.save(hotel).then(hotel).catch(reject);

                    return;
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * @param {Object} hotel
     * @param {Object} properties
     * @return {Object} hotel
     */
    setProperties(hotel, properties) {
        for (let key in properties) {
            if (Object.prototype.hasOwnProperty.call(hotel, key)) {
                hotel[key] = properties[key];
            }
        }

        return hotel;
    }

    /**
     * @param {Object} hotel
     * @return {Promise}
     */
    save(hotel) {
        if (!Object.prototype.hasOwnProperty.call(hotel, 'id')) {
            throw new Error('Id property is required.');
        }
        return new Promise((resolv, reject) => {
            this.getCollection().then((coll) => {
                coll.updateOne({id: hotel.id}, {$set: hotel})
                    .then((result) => resolv(result))
                    .catch((err) => reject(err));
            });
        });
    }


    /**
     * @param {Object} newHotel
     * @return {Promise}
     */
    insertOne(newHotel) {
        return new Promise((resolv, reject) => {
            this.insertOne(newHotel)
                .then((result) => resolv(result))
                .catch((err) => reject(err));
        });
    }

    /**
     * Close connection
     */
    close() {
        this.storage.close();
    }
}

module.exports = Hotel;
