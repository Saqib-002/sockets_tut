function listen(io){
    const pongNameSpace=io.of('/pong')
    let readyPlayerCount=0;
    pongNameSpace.on('connection',(socket)=>{
        let room
        console.log(`a user connected as... ${socket.id}`);
        socket.on('ready',()=>{
            room='room'+Math.floor(readyPlayerCount/2);
            console.log(room)
            socket.join(room);
            console.log('Player ready ',socket.id);
            readyPlayerCount++;
            if(readyPlayerCount%2===0){
                pongNameSpace.in(room).emit('startGame',socket.id);
            }
        })
        socket.on('paddleMove',(paddleData)=>{
            socket.to(room).emit('paddleMove',paddleData);
        } )
        socket.on('ballMove',(ballData)=>{
            socket.to(room).emit('ballMove',ballData);
        })
        socket.on('disconnect',(reason)=>{
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        })
    })
}

module.exports={
    listen
}