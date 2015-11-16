var streamPair = require('stream-pair')
var Interactive = require('multistream-select').Interactive
var Select = require('multistream-select').Select

var pair = streamPair.create()
var msi = new Interactive()
var mss = new Select()

var events = require('./lib/events')

mss.handle(pair.other)

mss.addHandler('/xxx/', function (ds) {
  ds.on('data', function (chunk) {
    showResponse('get ur data: ' + chunk.toString())
  })
  ds.on('end', function () {
    ds.end()
  })
})

mss.addHandler('/wtf/', function (ds) {
  ds.on('data', function (chunk) {
    console.log(chunk.toString())
    console.log('w')
  })
  ds.on('end', function () {
    ds.end()
  })
})

msi.handle(pair, function () {
  msi.ls(function (err, result) {
    if (err) {
      return console.log(err)
    }
    console.log('protocols supported: ', result)
  })
})

var client = events()

client.on('fail', function () {
  console.log('fail')
})

client.on('message', function (message) {
  msi.select(message.protocol, function (err, ds) {
    if (err) return showResponse(err)

    ds.write(message.data)
    ds.end()
  })
})

function showResponse(message) {
  document.getElementById('response').textContent = message
}
