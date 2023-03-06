//Referencias HTML
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const msgClient = document.getElementById('msgClient');
const btnClient = document.getElementById('btnClient');


const socketCliente = io(); //Mantiene el estado de comunicación con el server

socketCliente.on('connect', () => {
    console.log('Conectado al server.');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socketCliente.on('disconnect', () => {
    console.log('Desconectado del server.');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

socketCliente.on('send-msg', (payload)=>{
    console.log('Mensaje enviado por otro cliente', payload);
})

// Eventos

btnClient.addEventListener('click', () => {

    const msg = msgClient.value;

    const payload = {
        msg,
        fecha : new Date().getDate(),
        uid : 'aowd3hoi2awh5dia'
    }

    //Enviar mensaje al servidor
    socketCliente.emit('send-msg', payload)

})