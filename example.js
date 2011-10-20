var Bluff = require('./index');
var http = require('http');

var server = http.createServer(function(req, res){
  var g = new Bluff.Line('example', '400x300');
  g.title = 'My Graph';

  g.theme_37signals();

  g.data("Apples", [1, 2, 3, 4, 4, 3]);
  g.data("Oranges", [4, 8, 7, 9, 8, 9]);
  g.data("Watermelon", [2, 3, 1, 5, 6, 8]);
  g.data("Peaches", [9, 9, 10, 8, 7, 9]);

  g.labels = {0: '2003', 2: '2004', 4: '2005'};

  g.draw();

  var canvas = g.getCanvas();
  /*
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<img src="' + canvas.toDataURL() + '" />');
  */

  var buf = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buf.length
  });
  res.end(buf);
});
server.listen(8080);
