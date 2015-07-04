/**
 * Created by selemon on 4/07/15.
 */
var pg = require('pg').native
    , d3 = require("d3")
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();

var qu;
var o;
function parse(){
    d3.csv("CrimeDataNzCurrent.csv", function(error, data) {
        qu = data;
        qu.forEach(function(d){
            o = 'INSERT INTO data (Event_ID, Code, Event_Type, Category, Status, Location, Suburb, City, Published)';
            o+= ' VALUES ($$'+ d.Event_ID+'$$, $$'+ d.Code+'$$, $$'+ d.Event_Type+'$$, $$'+ d.Category+'$$, $$'+ d.Status+'$$, $$'+ d.Location+'$$, $$'+ d.Suburb+'$$, $$'+ d.City+'$$, $$'+ d.Published+'$$);';
            addToDatabase(o);
        });

    });
}

parse();

function addToDatabase(data){
    var cl = new pg.Client(connectionString);
   var query = cl.query(data);
    query.on('end', function() { cl.end(); });
}


