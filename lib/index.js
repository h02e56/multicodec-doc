var streamPair = require('stream-pair');
var Interactive = require('multistream-select').Interactive;
var Select = require('multistream-select').Select

var pair = streamPair.create();
var msi = new Interactive();
var mss = new Select();


mss.handle(pair.other);

mss.addHandler('/xxx/', function(ds) {
  ds.on('data', function(chunk) {
    console.log('que si');
  });
  ds.on('end', function() {
    ds.end();
  });
});
mss.addHandler('/aaaaaargh/', function(ds) {
  ds.on('data', function(chunk) {
    console.log(chunk.toString());
    console.log('w');
  });
  ds.on('end', function() {
    ds.end();
  });
});


msi.handle(pair, function() {
  msi.ls(function(err, result) {
    if (err) {
      return console.log(err)
    }

    console.log('results: ', result);
  });

  msi.select('/teambox/', function(err, ds) {
    if (err) {
      return console.log(err)
    }

    ds.write('woff');
    ds.end();
  });
});
