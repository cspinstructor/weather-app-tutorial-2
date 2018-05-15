var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a +b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 3000);
  });
};

asyncAdd(5, 7).then((res) => {
  console.log('Results: ', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 45', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
