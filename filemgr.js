// ----- Uses Mongodb and promises to save data ---------
const {MongoClient} = require('mongodb');
const fs = MongoClient

var obj = {
  table : [],
};


const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB server');
      }
      console.log('Connected to MongoDB server');
      const db = client.db('TestDb');
      db.collection('TestCollection').find().toArray().then((docs) => {
        resolve(docs);
      }, (err) => {
        reject('Unable to fetch todos', err);
      });
      client.close();
    });
  });
};

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB server');
      }
      console.log('Connected to MongoDB server');
      const db = client.db('TestDb');
      db.collection('TestCollection').find().toArray().then((docs) => {
        resolve(docs);
      }, (err) => {
        reject('Unable to fetch todos', err);
      });
      client.close();
    });
  });
};

const deleteAll = () => {
  obj.table = [];
  try {
    fs.unlinkSync('mydata.json');
  } catch (err) {}

}

module.exports = {
  getAllData,
  saveData,
  deleteAll,
}
