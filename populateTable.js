/**
 * Created by selemon on 4/07/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE quotes (quote_id BIGSERIAL PRIMARY KEY, author varchar(255) UNIQUE, quote varchar(255) NOT NULL)');
query.on('end', function() { client.end(); });