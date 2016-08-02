var express = require('express');
var bodyParser = require('body-parser');
var ws = new require('ws').Server({ port: process.env.WS_PORT || 9999 });
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

app.listen(process.env.SERVER_PORT || 5555);
