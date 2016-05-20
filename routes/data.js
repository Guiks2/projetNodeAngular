var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'projetnodeangular'
});

connection.connect();

router.get('/', function(req, res, next) {
    //res.render('index', {});
});

router.get("/title", function(req, res){

    var count = req.query.count;
    if (!count)
        count = 2;

    connection.query("SELECT * FROM songs LIMIT " + count, function (error, rows)
    {
        if(error){
            console.log(error);
            res.json({error:"Un problème est arrivé lors de la connexion"})
            return;
        }

        res.json(rows);
    });

});

module.exports = router;
