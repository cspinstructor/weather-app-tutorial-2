const fs = require('fs');

var obj = {
  table : [],
};

obj.table.push({
  name: 'apple',
  id: 123,
});

obj.table.push({
  name: 'ball',
  id: 223,
});

fs.writeFile('mydata.json',JSON.stringify(obj), 'utf8', (err,data) => {
  if (err) {
    console.log(err);
  }
});

fs.readFile('mydata.json', 'utf8',(err,data) => {
  if (err) {
    console.log(err);
  } else {
    const obj = JSON.parse(data);
    obj.table.reverse();
    obj.table.forEach((value)=>{
      console.log(value);
    });
  }

});

// mydata.forEach( (value) => {
//   fs.appendFile('mydata.json',JSON.stringify(value), 'utf8', (err,data) => {
//     if(err) throw err;
//   });
// });
//
// var obj;
// fs.readFile('mydata.txt', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
// });
