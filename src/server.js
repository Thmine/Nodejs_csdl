require('dotenv').config()

const express = require('express')
const configViewEngine = require('./config/ViewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
// get the client

const app = express()
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME

//config req.body
app.use(express.json()) //for json
app.use(express.urlencoded({ extended: true }))

//config template engine

configViewEngine(app)

//khai báo route
app.use('/', webRoutes) //tiền tố đầu tiên

//test connection

//simple query
connection.query(
    'SELECT * FROM accounts',
    function (err, results, fields) {
        // console.log(results); // results contains rows returned by server

    }
);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port} in ${hostname}`)
})