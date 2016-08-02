var server = require('http').createServer();
var express = require('express');
var bodyParser = require('body-parser');
var ws = new require('ws').Server({ server: server });
var app = express();

app.use(bodyParser.json());
app.post('/log', function (req, res) {
  if (!req.body) {
    return res.status(500).json({ error: 'should not be empty' });
  }

  try {

    ws.clients.forEach(function (client) {
      client.send(JSON.stringify(req.body));
    });
  } catch (e) {
    console.log(e);
  }

  res.json({ ok: 1 });
});

server.on('request', app);
server.listen(process.env.PORT || 5555);
