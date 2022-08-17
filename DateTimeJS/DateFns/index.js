const formatDistanceToNowStrict = require('date-fns/formatDistanceToNowStrict')
const getQuarter = require('date-fns/getQuarter')
const startOfYear = require('date-fns/startOfYear')
const isLeapYear = require('date-fns/isLeapYear')
const isAfter = require('date-fns/isAfter')
const isBefore = require('date-fns/isBefore')

console.log(formatDistanceToNowStrict(new Date(2007, 0, 29), { addSuffix: true }))

console.log(formatDistanceToNowStrict(new Date(2007, 0, 29), { addSuffix: true, locale: require('date-fns/locale/pl') }))

console.log(getQuarter(new Date('2013-01-01T00:00:00.000')))

console.log(startOfYear(new Date()))

console.log(isLeapYear(new Date()))

const date = new Date(2010, 10, 20)
console.log(isAfter(date, new Date(2010, 10, 19)) && isBefore(date, new Date(2010, 10, 25)))