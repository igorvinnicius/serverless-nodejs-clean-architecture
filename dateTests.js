var dateFormat = require('dateformat');
var now = new Date();
dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
console.log(now);


var dateFormat = require('dateformat');
var utc = Date.UTC();
dateFormat(utc, "dddd, mmmm dS, yyyy, h:MM:ss TT");
console.log(utc);

var utcTest = new Date();
console.log(utcTest.toISOString());