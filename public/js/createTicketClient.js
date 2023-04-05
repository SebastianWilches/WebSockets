//Referencias HTML
const lblCreateTicket = document.getElementById('lblCreateTicket');
const btnCreate = document.getElementById('btnCreate');


const socketCliente = io();


socketCliente.on('connect', () => {
    btnCreate.display = false;
})

socketCliente.on('disconnect', () => {
    btnCreate.display = true;
})

socketCliente.on('last-ticket', (lastPos) => {
    // console.log(lastPos);
    lblCreateTicket.innerText = `Ticket #${lastPos} creado.`
})


//Eventos
btnCreate.addEventListener('click', () => {

    //Crear ticket
    socketCliente.emit('create-ticket', null, (ticket)=>{
        // console.log('RESPONSE: ',ticket);
        lblCreateTicket.innerText = ticket
    });

})