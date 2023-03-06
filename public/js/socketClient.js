//Referencias HTML
const lblOnline = document.getElementById('lblOnline');
const lblOffline  = document.getElementById('lblOffline');


const socketCliente = io();

socketCliente.on('connect', ()=>{
    console.log('Conectado al server.');

    lblOffline.style.display= 'none';
    lblOnline.style.display= '';
})

socketCliente.on('disconnect', ()=>{
    console.log('Desconectado del server.');

    lblOffline.style.display= '';
    lblOnline.style.display= 'none';
})