const express = require("express")
const bodyParser = require("body-parser")
const zmq = require("zeromq")

const app = express()
app.use(bodyParser.json())

const publisher = zmq.socket("pub")
publisher.bindSync("tcp://*:5556")

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
   // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.get("/", function (req, res) {
  publisher.send("wat")
  res.send("hello world")
})

app.post("/", function (req, res) {
  publisher.send(JSON.stringify(req.body))
  res.send("hello post")
})

app.listen(8000, function () {
  console.log("listening on port 8000")
})
