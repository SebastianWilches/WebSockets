const { TicketModel } = require("../models/TicketModel");


const ticketModel = new TicketModel();

const socketController = (socket) => {
    
    //Crear un ticket
    socket.on('create-ticket', (payload, callback) => {
        
        const next = ticketModel.nextTicket();
        //En el callback le voy a mandar cual es el ticket generado
        callback(next);
    })

    //Cargar el último ticket generado
    socket.emit('last-ticket', ticketModel.lastPosQueue);
}

module.exports = {
    socketController
}