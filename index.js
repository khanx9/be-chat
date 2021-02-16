
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
  cors : {
    origin: '*'
  }
});
const cors = require("cors");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

io.on('connection', (socket) => {  
  console.log('a user connected'); 

  socket.on('message', (msg) => {
    console.log('send',msg);
    socket.broadcast.emit('message-broadcast', msg);
   });
});



app.get('/', (req, res) => res.send('hello!'));
  http.listen(3000, () => {
  console.log('listening on *:3000');
});