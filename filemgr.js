const fs = require('fs');

var obj = {
  table : [],
};

const getAllData = () => {
  try {
    const readfile = fs.readFileSync('mydata.json', 'utf8');
    obj = JSON.parse(readfile);
    // obj.table.forEach((value)=>{
    //   console.log(value);
    // });
    return obj.table;
  } catch (err) {
    console.log('File not found');
    return obj.table;
  }
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
