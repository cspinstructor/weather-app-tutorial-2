//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID(); //unused demo only

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TestDb');

  // findOneAndUpdate
  db.collection('TestCollection').findOneAndUpdate({
    name: 'aaa',
  }, {
    $set: {
      name: 'apple',
    }
  }, {
    returnOriginal: false,
  }).then((result) => {
    console.log(result);
  });

  client.close();
});
