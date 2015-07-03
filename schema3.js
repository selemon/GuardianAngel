/**
 * Created by selemon on 26/05/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('INSERT INTO quotes(author, quote) VALUES($1, $2)', ["Selemon Yitbarek", "this is my first quote"]);
query.on('end', function() { client.end(); });