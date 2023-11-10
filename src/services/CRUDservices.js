const connection = require("../config/database")

const getAllaccounts = () => {

    // let [results, fields] = await connection.query('select * from accounts')
    // return results
    return new Promise((resolve, reject) => {
        connection.query('select * from users', (err, results) => {
            resolve(results);
        });
    })
}

const getUpdateaccount = (ID) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from users where id =?', [ID], (err, results) => {
            if (err) reject(err);
            resolve(results);
            //return results.length > 0 ? results[0] : null
        });

    });
}



module.exports = {
    getAllaccounts, getUpdateaccount
}
