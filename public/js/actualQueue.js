//Referencias HTML
lblTicket1 = document.getElementById('ticket1');
operator1 = document.getElementById('operator1');
lblTicket2 = document.getElementById('ticket2');
operator2 = document.getElementById('operator2');
lblTicket3 = document.getElementById('ticket3');
operator3 = document.getElementById('operator3');
lblTicket4 = document.getElementById('ticket4');
operator4 = document.getElementById('operator4');

//                              SOCKETS
const socketCliente = io();

socketCliente.on('actual-queue', (payload) => {
    const [ticket1, ticket2, ticket3, ticket4] = payload;
    console.log(payload);

    if (ticket1) {
        lblTicket1.innerText = 'Ticket #' + ticket1.number;
        operator1.innerText = ticket1.operator;
    }

    if (ticket2) {
        lblTicket2.innerText = 'Ticket #' + ticket2.number;
        operator2.innerText = ticket2.operator;
    }

    if (ticket3) {
        lblTicket3.innerText = 'Ticket #' + ticket3.number;
        operator3.innerText = ticket3.operator;
    }

    if (ticket4) {
        lblTicket4.innerText = 'Ticket #' + ticket4.number;
        operator4.innerText = ticket4.operator;
    }
})