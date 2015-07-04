/**
 * Created by selemon on 4/07/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE data (Event_ID varchar(55) PRIMARY KEY, Code varchar(55), Event_Type varchar(255), Category varchar(255), Status varchar(255), Location varchar(255), Suburb varchar(255), City varchar(255), Published date)');
query.on('end', function() { client.end(); });