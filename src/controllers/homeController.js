const { request } = require('express')
const connection = require('../config/database')
const { getAllaccounts, getUpdateaccount } = require('../services/CRUDservices')
const { hashPassword } = require('../services/bcrypt')


const getHomepage = async (req, res) => {
    return res.render('home.ejs')
}

const getsign_in = (req, res) => {
    res.render('sign_in.ejs')
}
const postsign_in = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, rows) => {
        if (rows.length <= 0) {
            res.redirect("/sign_in");
            return;
        }
        let user = rows[0];

        let pass_fromdb = user.password;
        console.log('userpass=', pass_fromdb)
        var kq = comparePassword(password, pass_fromdb);
        if (kq) {
            console.log("OK");
            res.redirect("/sign_in/thanhcong");
        }
        else {
            console.log("Not OK");
            res.redirect("/sign_in");
        }
    });
}

// Hàm so sánh password
async function comparePassword(password, hashedPassword) {
    // code xử lý so sánh password  
}

const getsign_up = (req, res) => {
    res.render('sign_up.ejs')
}

const gettable = async (req, res) => {
    let results = await getAllaccounts()
    return res.render('table.ejs', { listaccounts: results })
}



const postCreateUser = async (req, res) => {
    //console.log("request.body:", req.body)
    let username = req.body.username
    let password = req.body.password
    let role = req.body.role || 'user'
    //const bcrypt = require('bcrypt')
    // Mã hóa password
    //let hashedPassword = await hashPassword(password);

    connection.query(
        `INSERT INTO users (username, password, role)
          VALUES (?,?,?)
      `,
        [username, password, role],
        function (err, results) {
            console.log(results);
            res.redirect('/table')
        });

}

const getUpdateUser = async (req, res) => {
    const ID = req.params.id;
    let user = await getUpdateaccount(ID);
    user = Array.isArray(user) ? user[0] : user
    res.render('edit_user.ejs', { useredit: user })
}
const postUpdateUser = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let ID = req.body.ID
    let role = req.body.role
    console.log('ID:', username, ID, role)
    connection.query(
        `UPDATE users 
        SET username =?, password =?, role=?
        WHERE id=?
      `,
        [username, password, role, ID],
        function (err, results) {
            console.log(results);
            res.redirect('/table')
        });
}
const postDeleteUser = async (req, res) => {
    const ID = req.params.id;
    let user = await getUpdateaccount(ID);
    user = Array.isArray(user) ? user[0] : user
    res.render('delete_user.ejs', { useredit: user })
    console.log('delete user', user)
    // res.render('delete_user.ejs')
}

const postHandleRemoveUser = async (req, res) => {
    try {
        let ID = req.body.ID;
        await connection.promise().query(
            'DELETE FROM users WHERE id = ?', [ID]
        );
    } catch (err) {
        console.error(err);
    }
    res.redirect('/table');
}



module.exports = {
    getHomepage, getsign_in, gettable, getsign_up, postCreateUser, getUpdateUser, postUpdateUser, postDeleteUser,
    postHandleRemoveUser, postsign_in
}