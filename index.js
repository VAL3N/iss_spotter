const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log(error);
    } else {
      console.log(coordinates);
    }
  });

});




/* ***** Setting the callback into a variable to be used ****** */
// const callback = (error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// };

// fetchMyIP(callback);

