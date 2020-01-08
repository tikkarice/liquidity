const MongoClient = require('mongodb').MongoClient;

//const url = 'mongodb://localhost:27017';
//const dbName = 'login';
const url = "mongodb://mongdbusr:Ld4MDB4D12_19@3.18.223.74:27017/liquidity_test"
const dbName = 'liquidity_test';
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