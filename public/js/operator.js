const lblOperator = document.getElementById('lblOperator');
const lblActualTicket = document.getElementById('lblActualTicket');
const btnAtender = document.getElementById('btnAtender');
const containerCallout = document.querySelector('.callout');

containerCallout.style.display = 'none';



//Extraer el parámetro que viene por URL del nombre del operario que va a atender los tickets
const searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('operatorName')) {
    window.location = 'index.html' //En caso de que este parámetro no venga, lo devuelva al index
    throw new Error('El nombre del operario es obligatorio');
}



//Extraemos la info de la URL
const operatorName = searchParam.get('operatorName');
lblOperator.innerText = operatorName;






//                              SOCKETS
const socketCliente = io();


socketCliente.on('connect', () => {
    btnAtender.display = false;
})

socketCliente.on('disconnect', () => {
    btnAtender.display = true;
})

socketCliente.on('last-ticket', (lastPos) => {
    // console.log(lastPos);
    lblCreateTicket.innerText = `Ticket #${lastPos} creado.`
})


//Eventos
btnAtender.addEventListener('click', () => {

    socketCliente.emit('attend-ticket', { operatorName }, (payload) => {
        console.log(payload);

        const { ok, msg, ticket } = payload;

        if(!ok){
            containerCallout.style.display = '';
            lblActualTicket.innerText = '-';
        }

        lblActualTicket.innerText = ticket.number;

    })


})