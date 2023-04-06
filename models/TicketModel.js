const path = require('path');
const fs = require('fs');


//Contendrá la información de un ticket individual
class Ticket {

    constructor(number, operator) {
        this.number = number;
        this.operator = operator; //Este operador es el que me dará solución al ticket atendido.
    }

}

//Contendrá la información completa de los tickets (Lista enlazada)
class TicketModel {

    constructor() {
        this.lastPosQueue = 0;
        this.day = new Date().getDate();
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
        this.ticketsArray = [];
        this.last4Tickets = [];

        this.init(); //Leer datos guardados.
    }

    get toJson() {
        return {
            lastPosQueue: this.lastPosQueue,
            day: this.day,
            month: this.month,
            year: this.year,
            ticketsArray: this.ticketsArray,
            last4Tickets: this.last4Tickets,
        }
    }


    //Leer el archivo de Data guardado en la database
    init() {
        const { lastPosQueue, day, month, year, ticketsArray, last4Tickets } = require('../database/data.json');
        // console.log(data);

        //En caso de que el server de sockets tenga que reiniciar, que cargue todas las del día actual que estaban en persistencia
        if (day === this.day && month === this.month && year === this.year) {
            this.lastPosQueue = lastPosQueue;
            this.day = day;
            this.month = month;
            this.year = year;
            this.ticketsArray = ticketsArray;
            this.last4Tickets = last4Tickets;
        } else { //Es otro día
            this.saveDB();
        }

    }

    saveDB() {
        const dbPath = path.join(__dirname, '../database/data.json');


        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }


    nextTicket() {
        this.lastPosQueue += 1;
        const ticket = new Ticket(this.lastPosQueue, null);
        this.ticketsArray.push(ticket);

        this.saveDB();
        return (`Ticket #${ticket.number} creado.`)
    }

    handleTicket(operator) {

        //Case: La lista de tickets esta vacía
        if (this.ticketsArray.length === 0){
            return null;
        }

        //Case: Voy a atender el primer ticket en la cola
        const actualTicket = this.ticketsArray.shift(); //Saco el primer ticket de la lista
        actualTicket.operator = operator; //Lo asigno a un operador

        this.last4Tickets.unshift(actualTicket); //Añado un elemento al inicio del arreglo
        if(this.last4Tickets.length > 4){
            this.last4Tickets.splice(-1,1) //Quiero que empieze en la ultima pos y corte hasta 1 despues.
        }
        this.saveDB();

        return actualTicket;
    }



}

module.exports = {
    TicketModel,
}