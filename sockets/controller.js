const { TicketModel } = require("../models/TicketModel");


const ticketModel = new TicketModel();

const socketController = (socket) => {

    //Cargar el último ticket generado y la lista de tickets atendidos.
    socket.emit('last-ticket', ticketModel.lastPosQueue);
    socket.emit('actual-queue', ticketModel.last4Tickets);
    socket.emit('tickets-pendientes', ticketModel.ticketsArray.length);


    //Crear un ticket
    socket.on('create-ticket', (payload, callback) => {

        const next = ticketModel.nextTicket();
        //En el callback le voy a mandar cual es el ticket generado
        callback(next);
    })

    //Atender ticket desde operador
    socket.on('attend-ticket', (payload, callback) => {

        //Verificamos si el nombre del operador esta vacio
        if (!payload.operatorName) {
            return callback({
                ok: false,
                msg: 'No viene el nombre del operador',
            })
        }


        const ticket = ticketModel.handleTicket(payload.operatorName);

        socket.broadcast.emit('actual-queue', ticketModel.last4Tickets); //Actualizamos esta lista
        socket.emit('tickets-pendientes', ticketModel.ticketsArray.length); //Para que actualice a el mismo
        socket.broadcast.emit('tickets-pendientes', ticketModel.ticketsArray.length); //Para que actualice al resto

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets para atender',
            })
        } else {
            return callback({
                ok: true,
                ticket
            })
        }
    })

}

module.exports = {
    socketController
}