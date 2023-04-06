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


    //Atender ticket desde operador
    socket.on('attend-ticket', (payload, callback) =>{

        //Verificamos si el nombre del operador esta vacio
        if(!payload.operatorName){
            return callback({
                ok: false,
                msg: 'No viene el nombre del operador',
            })
        }


        const ticket = ticketModel.handleTicket(payload.operatorName);
        if(!ticket){
            return callback({
                ok: false,
                msg: 'Ya no hay tickets para atender',
            })
        }else{
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