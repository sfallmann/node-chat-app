const moment = require('moment');

// UNIX Epoch Jan 1st 1970 00:00:00 am
//var date = new Date();
//console.log(date.getMonth());

var date = moment();
console.log(date.format('MMM Do, YYYY h:mma Z'));
