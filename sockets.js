function listen(io){
    const pongNameSpace=io.of('/pong')
    let readyPlayerCount=0;
    pongNameSpace.on('connection',(socket)=>{
        console.log(`a user connected as... ${socket.id}`);
        socket.on('ready',()=>{
            console.log('Player ready ',socket.id);
            readyPlayerCount++;
            if(readyPlayerCount%2===0){
                pongNameSpace.emit('startGame',socket.id);
            }
        })
        socket.on('paddleMove',(paddleData)=>{
            socket.broadcast.emit('paddleMove',paddleData);
        } )
        socket.on('ballMove',(ballData)=>{
            socket.broadcast.emit('ballMove',ballData);
        })
        socket.on('disconnect',(reason)=>{
            console.log(`Client ${socket.id} disconnected: ${reason}`);
        })
    })
}

module.exports={
    listen
}