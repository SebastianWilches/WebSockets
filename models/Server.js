//HTTP
const cors = require('cors')
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        //Midlewares = Van a agregar otra funcionalidad al WebServer
        this.middlewares();

        //Rutas
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {
        //Middleware para CORS
        this.app.use(cors())

        //Para que use un directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
        //Middleware para rutas
        // this.app.use(this.paths.userRoute, require('../routes/user'));        
    }

    sockets() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado. ID: ', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            })

            socket.on('send-msg', (payload) => {
                console.log('Objeto enviado desde el cliente:', payload);
            })
        })
    }

    start() {
        this.server.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }
}

module.exports = {
    Server
}