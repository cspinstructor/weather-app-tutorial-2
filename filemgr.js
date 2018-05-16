// ----- Uses Mongodb and promises to save data ---------
const {MongoClient} = require('mongodb');
const fs = MongoClient

//--  for development:
//const database = 'mongodb://localhost:27017'
//-- for deployment:
const database = 'mongodb://inti2018:inti2018@ds259255.mlab.com:59255/weatherapp'

var obj = {
  table : [],
};


const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB server');
      }
      console.log('Connected to MongoDB server');
      const db = client.db('weatherapp');
      db.collection('weatherappcollection').find().toArray().then((docs) => {
        resolve(docs);
      }, (err) => {
        reject('Unable to fetch data', err);
      });
      client.close();
    });
  });
};

const saveData = (newdata) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB server');
      }
      console.log('Connected to MongoDB server');
      const db = client.db('weatherapp');
      db.collection('weatherappcollection').insertOne(newdata,(err, result) => {
        if (err) {
          reject(`Unable to insert ${err}`);
        }
        //const timestamp = JSON.stringify(result.ops[0]._id.getTimestamp())
        resolve(result);
      });
      client.close();
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(database, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        reject('Unable to connect to MongoDB server');
      }
      console.log('Connected to MongoDB server');
      const db = client.db('weatherapp');
      db.collection('weatherappcollection').remove({}).then((result) => {
        resolve(result.result);
      });
      client.close();
    });
  });
};


module.exports = {
  getAllData,
  saveData,
  deleteAll,
}
