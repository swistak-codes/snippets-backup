const moment = require('moment/min/moment-with-locales')

console.log(moment([2007, 0, 29]).fromNow())

moment.locale('pl')
console.log(moment([2007, 0, 29]).fromNow())

moment.locale('en')

console.log(moment('2013-01-01T00:00:00.000').quarter())

console.log(moment().startOf('year'))

console.log(moment().isLeapYear())

console.log(moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'))