const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'login';
let db = null;

const connect = async() => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true});
        db = client.db(dbName);
    } catch (error) {
        console.log('unable to connect', error);
    }
};

const getConnectionInstance = () => {
    return db || null;
};


module.exports = {
    getConnectionInstance: getConnectionInstance,
    connectToDb: connect,
};