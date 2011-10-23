var Bluff = require('./index');
var http = require('http');

var server = http.createServer(function(req, res){
  var g = new Bluff.SideStackedBar('example', '400x300');
  g.set_theme({
    colors: [
     '#70c5ff',
     '#ffc570',
     '#ffc5ff',
     '#70cf70',
     '#6f83ff',
     '#e0553e',
     '#87318c',
     '#0160a0',
     '#ef1c25',
     '#b3d334'
    ],
    marker_color: '#999999',
    font_color: 'black',
    background_colors: 'white'
  });
  g.title = 'My Graph';
  g.tooltips = false;
  g.sort = false;
  g.hide_title = true;
  g.hide_labels_less_than = 101;
  g.minimum_value = 0;
  g.maximum_value = 101;
  g.legend_font_size = 20;
  g.no_data_message = 'No data';

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
