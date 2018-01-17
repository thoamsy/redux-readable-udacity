const { distanceInWords, subDays } = require('date-fns');
console.log(distanceInWords(new Date(2017, 12, 15), new Date(), {addSuffix: true}));
