//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID(); //unused demo only

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TestDb');

  // deleteMany
  db.collection('TestCollection').deleteMany({name: 'ccd'}).then((result) => {
    console.log(result.result);
  });

  // deleteOne
  db.collection('TestCollection').deleteOne({name: 'bba'}).then((result) => {
    console.log(result.result);
  });

  // findOneAndDelete
  db.collection('TestCollection').findOneAndDelete({name: 'pap'}).then((result) => {
    console.log(result);
  });

  // deleteAll
  db.collection('TestCollection').remove({}).then((result) => {
    console.log(result.result);
  });

  client.close();
});
