//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID(); //unused demo only

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TestDb');
  db.collection('TestCollection').find({name: 'ccd'}).toArray().then((docs) => {
    console.log('TestCollection:');
    console.log(JSON.stringify(docs));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });
  client.close();
});
