const port = 8000
const io = require('socket.io')()
const zmq = require("zeromq")

const subscriber = zmq.socket("sub")
subscriber.subscribe("github")
subscriber.connect("tcp://localhost:5557")

io.on("connection", client => {
  subscriber.on("message", function (channel, data) {
    client.emit("redux", { type: "FLASH", payload: data.toString() })
  })

  console.log("a user connected");
  client.on("subscribeToTimer", (interval) => {
    console.log("a user is subscribing to timer with interval: ", interval)
    setInterval(() => {
      timestamp = new Date()
      client.emit('timer', { type: 'SET_TIME', payload: timestamp })
    }, interval)
  });
})

io.listen(port, () => console.log('listening on port ', port))
