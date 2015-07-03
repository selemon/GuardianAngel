/**
 * Created by selemon on 27/05/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE users (user_name varchar(55) PRIMARY KEY NOT NULL UNIQUE, password varchar NOT NULL, access_token varchar)');
query.on('end', function() { client.end(); });
