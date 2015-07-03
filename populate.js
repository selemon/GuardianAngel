/**
 * Created by selemon on 27/05/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

// Load the bcrypt module
var bcrypt = require('bcrypt');

client = new pg.Client(connectionString);
client.connect();


// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync("hello", salt);

query = client.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', ["selemon", hash]);
query.on('end', function() { client.end(); });

