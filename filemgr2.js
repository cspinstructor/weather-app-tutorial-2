//------------  Uses Mongodb to save data -----------
const {MongoClient} = require('mongodb');
const fs = MongoClient

var obj = {
  table : [],
};

const getAllData = () => {
  MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TestDb');
    db.collection('TestCollection').find().toArray().then((docs) => {
      console.log('TestCollection:');
      console.log(JSON.stringify(docs));
      return docs;
    }, (err) => {
      console.log('Unable to fetch todos', err);
    });
    client.close();
  });
};

const saveData = (newdata) => {
  try {
    const readfile = fs.readFileSync('mydata.json', 'utf8');
    obj = JSON.parse(readfile);
  } catch (err) {}

  obj.table.push(newdata);
  fs.writeFileSync('mydata.json',JSON.stringify(obj), 'utf8');
}

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
