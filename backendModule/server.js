const express = require('express');
const bodyParser = require('body-parser');

const dbConnection = require('./util/dbConnection');
const router = require('./routes/route');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routeFn = async () => {
    await dbConnection.connectToDb();
    app.use(router);
    app.use('/', (req, res) => {
        res.send({ errorCode: 1, msg: 'Invalid route' });
    });
}
 
app.listen(3000, () => {
    console.log('server is listening on port 3000');
    routeFn();
});