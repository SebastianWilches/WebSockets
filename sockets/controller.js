const { TicketModel } = require("../models/TicketModel");


const ticketModel = new TicketModel();

const socketController = (socket) => {
    console.log('Cliente conectado. ID: ', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    //Escuchar cuando el cliente emite un evento
    socket.on('send-msg', (payload) => {
        
        //Emitir un evento a todos los clientes conectados
        socket.broadcast.emit('send-msg', payload);
    })
}

module.exports = {
    socketController
}