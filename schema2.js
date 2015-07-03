/**
 * Created by selemon on 24/05/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('DROP TABLE quotes');
query.on('end', function() { client.end(); });