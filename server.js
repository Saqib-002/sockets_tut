const http=require('http');
const apiServer=require('./api');
const io=require('socket.io'); 
const httpServer=http.createServer(apiServer);
const socketServer= io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
const sockets=require('./sockets');


const PORT=3000;


httpServer.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}...`);
})

sockets.listen(socketServer)