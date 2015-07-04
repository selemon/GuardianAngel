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




//get API
app.get('/getData', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        //var query = client.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
        //
        //// Stream results back one row at a time
        //query.on('row', function(row) {
        //    results.push(row);
        //});
        //
        //// After all data is returned, close connection and return results
        //query.on('end', function() {
        //    client.end();
        //    if(results.length<1){
        //        return res.status(404).send({"error":"NOT FOUND"});
        //    }
        //    return res.send(JSON.stringify(results));
        //});

        return res.send(JSON.stringify({"hello":"it works"}));

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });

});

app.post('/PostData', function(req, res) {



            // Grab elements from body JSON object.
            title = req.body.data;

            // Basic sanity checking. Is this even going to work?
            if(	title === undefined){
                res.status(400).send("Bad request. Some parameter not defined or missing. I recieved this body:" + req.body);
                return;
            }
            //Connect to database.
            pg.connect(connectionString, function (err, client, done) {
                console.log("DB Connected with port: " + port);
                // SQL parameterized query to insert entry.
                query = client.query(title);

                var results = [];  //stores results.. in this case should just be one.
                //handle database events. errors first.
                query.on('error', function (errorMsg) {
                    console.log("Debug: database error:" + errorMsg);
                    res.status(400).send({"error": "database error"});
                    client.end();
                });
                // Stream results back one row at a time
                query.on('row', function (resultRow) {
                    console.log("Debug: (/memory/store) returning obejct: " + resultRow);
                    results.push(resultRow);
                });
                // After all data is returned, close connection and return results
                query.on('end', function () {
                    client.end();
                    res.status(200).send({"hello": "it worked"});
                });
                // Handle Errors - by console display
                if (err) {	console.log(err);  }
            });


});


// use PORT set as an environment variable
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
