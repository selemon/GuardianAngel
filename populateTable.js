/**
 * Created by selemon on 4/07/15.
 */
var pg = require('pg').native
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query("COPY data (Event_ID ,Code ,Event_Type ,Category ,Status ,Location ,Suburb ,City ,Published) FROM 'CrimeDataNzCurrent.csv'");
query.on('end', function() { client.end(); });