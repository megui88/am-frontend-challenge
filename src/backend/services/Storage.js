/**
 * Class Storage services
 */
class Storage {
    /**
     * @param {MongoClient} client
     * @param {Object} config
     */
    constructor(client, config) {
        this.client = client;
        this.connection = 0;
        this.connections = [];
        this.collection = null;
        this.url = null;
        this.db = null;

        if (typeof config !== 'undefined') {
            this.setConfig(config);
        }
    }

    /**
     * @param {Promise} connection
     */
    setConnection(connection) {
        this.connection = this.connections.length;
        this.connections.push(connection);
    }

    /**
     * @param {Object} config
     */
    setConfig(config) {
        for (let key in config) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                this[key] = config[key];
            }
        }
    }

    /**
     * @return {Promise}
     */
    getConnection() {
        return new Promise((resolv, reject) => {
            if (this.connections.length > 0 && this.connections[this.connection] !== void 0) {
                resolv(this.connections[this.connection]);
                return;
            }

            this.client.connect(this.url)
                .then((conn) => {
                    this.setConnection(conn);
                    resolv(conn);
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * @return {Promise}
     */
    getDb() {
        return new Promise((resolv, reject) => {
            this.getConnection()
                .then((conn) => {
                    resolv(conn.db(this.db));
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * @param {string} collection
     * @return {Promise}
     */
    getCollection(collection) {
        collection = typeof collection !== 'undefined' ? collection : this.collection;
        return new Promise((resolv, reject) => {
            this.getDb()
                .then((database) => {
                    let coll = database.collection(collection);
                    resolv(coll);
                    return coll;
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * Close connection
     */
    close() {
        this.connections.forEach((connection) => {
            connection.close();
        });
    }
}

module.exports = Storage;
