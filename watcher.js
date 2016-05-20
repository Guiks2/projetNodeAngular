var conn = require('./connection.js');
var fs = require('fs');
var chokidar = require('chokidar');
var watcher = chokidar.watch('incoming_songs', {ignored: /[\/\\]\./});
var id3 = require('id3js');
var sanitize = require("sanitize-filename");
var pathLib = require('path');

watcher.on('add', addFileToExtract);

var files = [];
var extracting = false;

function addFileToExtract(path){
    files.push(path);
    //console.log(files);
    extract();
}

function extract()  {
    if(extracting || files.length == 0){
        return;
    }

    extracting = true;
    var path = files.pop();
    var fileName = pathLib.basename(path);
    console.log("Extracting : "+path);
    if(pathLib.extname(fileName) == '.mp3') {
        id3({file: path, type: id3.OPEN_LOCAL}, function (err, tags) {
            if (err) {console.log(err+fileName);return;}
            if (tags.album) {
                album = sanitize(tags.album);
                newPath = 'albums/' + album;
            } else {
                newPath = 'albums/unknown';
            }
            existsRepo(path, newPath, fileName);
        });
    } else {
        newPath = 'garbage';
        existsRepo(path, newPath, fileName);
    }
    extracting = false;
    setTimeout(extract, 600);
     

  /*  console.log("Fichier ajouté : " + file);
    fs.readFile(file, 'utf8', function(error, data){
        // unlink
        fs.unlink(file);

        if (error){
            console.log(error);
            return;
        }

        var content = data;
        var users = content.split("\n");

        for (var j = 0; j < users.length; j++ ){
            addSong(users[j]);
        }
    });*/
}

function existsRepo(oldPath, newPath, fileName){
    fs.stat(newPath, function (doesExist) {
        if (doesExist) {
            createRepository(newPath);
        }
        moveFile(oldPath,  newPath + '/' + fileName);
    });
}

function moveFile(oldPath, newPath){
    fs.rename(oldPath, newPath, function (error) {
        if (error) {console.log(error);return;}
        console.log('Déplacement réussi dans '+newPath);
    });
}

function createRepository(path){
    fs.mkdir(path, 0777, function (error) {
        if (error) {console.log(error);return;}
        console.log("Création du dossier de l'album.");
    });
}

function addSong(filename){
    conn.connection.query("SELECT * FROM songs WHERE file_name = '"+filename+"'", function (error, file_rows){
        if(!file_rows[0]) {
            conn.connection.query("INSERT INTO songs(name) VALUES ('" + user + "')");
            console.log("Insertion dans la table de : " + user);
        }
    });
}

