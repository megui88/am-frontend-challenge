module.exports = {
    url: process.env.MONGOURL || 'mongodb://mongodb:27017/',
    db: process.env.DB || 'almundo',
    collection: process.env.COLLECTION || 'hotel',
};
