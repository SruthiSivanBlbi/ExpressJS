const mysql = require('mysql');
let dbServer = null;

const connectToDB = (callback => {
    var dbDetails = mysql.createConnection({
        host: "10.0.10.1",
        port: "3306",
        user: "user",
        password: "HWf6frqGoR61",
        database: "SUNIDHI_CORE_V2_0"
    })
    dbDetails.connect((err) => {
        if (err) {
            console.log(err);
        }
        else {
            dbServer = dbDetails;
            console.log("Connected to Database");
            callback();
        }
    })
})

function perfromDBOperation(query, callback) {
    dbServer.query(query, (err, result) => {
        callback(err, result);
    })
}

module.exports = {
    connectToDB,
    perfromDBOperation
}