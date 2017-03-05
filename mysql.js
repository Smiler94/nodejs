var mysql = require('mysql')

// console.log(mysql)
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

// console.log(connection)
// select
var sql = 'select name,age from node_user'
connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
    console.log(fields)
    for (var i in rows) {
        console.log(rows[i].name + rows[i].age)
    }
})

// update
var sql = 'update node_user set name = ?,age = ? where id = ?'
var param = ['linzhen', 22, 6]
connection.query(sql, param, function(err, result) {
    if (err) throw err;
    console.log('affect rows:' + result.affectedRows)
})

// add
var sql = 'insert into node_user(id,name,age) values(0,?,?)'
var param = ['linjia', 55]
connection.query(sql, param, function(err, result) {
    if (err) throw err;
    var id = result.insertId
    console.log('insert id:' + result.insertId)
})

// delete 
var sql = 'delete from node_user where id = ?'
var param = [6]
connection.query(sql, param, function(err, result) {
    if (err) throw err;
    console.log('delete result:' + result.affectedRows)
})