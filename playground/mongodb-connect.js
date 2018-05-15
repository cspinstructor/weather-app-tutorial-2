//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID(); //unused demo only

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TestDb');
  db.collection('TestCollection').insertOne({
    name: 'ccd',
    ic: 333222,
  },(err, result) => {
    if (err) {
      return console.log('Unable to insert', err);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  });
  client.close();
});
