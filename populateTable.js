/**
 * Created by selemon on 4/07/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();

query = client.query();
query.on('end', function() { client.end(); });