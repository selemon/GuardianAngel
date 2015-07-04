/**
 * Created by selemon on 4/07/15.
 */
// use the express middleware
var express = require('express')
    , pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , start = new Date()
    , port = process.env.PORT
    , client;


// make express handle JSON and other requests
var bodyParser = require('body-parser');

// use cross origin resource sharing
var cors = require('cors');

var app=express();

// make sure we can parse JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// serve up files from this directory
app.use(express.static(__dirname));
// make sure we use CORS to avoid cross domain problems
app.use(cors());




//get API return the info for a particular city
app.get('/getData/:city', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM data WHERE City = $1',[req.params.city]);
        //
        //// Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        //
        //// After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            if(results.length<1){
                return res.status(404).send({"error":"NOT FOUND"});
            }
            return res.send(results);
        });

        //return res.send(JSON.stringify({"hello":"it works"}));

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });

});


//get API return the info for a particular suburb
app.get('/getSuburb/:suburb', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM data WHERE Suburb = $1',[req.params.suburb]);
        //
        //// Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        //
        //// After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            if(results.length<1){
                return res.status(404).send({"error":"NOT FOUND"});
            }
            return res.send(results);
        });

        //return res.send(JSON.stringify({"hello":"it works"}));

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });

});

//get API return the info for a particular location
app.get('/getLocation/:location', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query('SELECT * FROM data WHERE Location = $1',[req.params.location]);
        //
        //// Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        //
        //// After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            if(results.length<1){
                return res.status(404).send({"error":"NOT FOUND"});
            }
            return res.send(results);
        });

        //return res.send(JSON.stringify({"hello":"it works"}));

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });

});



// use PORT set as an environment variable
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
