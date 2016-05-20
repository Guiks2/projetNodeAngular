var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'projetnodeangular',
});

process.on('SIGINT', function(){
    connection.end();
    process.exit();
});

function getSongs(callback) {
    connection.query("SELECT * FROM songs", function (error, rows) {
        if (error) {
            console.log(error);
            return;
        }
    });
}

module.exports = {connection : connection, getSongs : getSongs};
