//HTTP
const cors = require('cors')
const express = require('express');
const { socketController } = require('../sockets/controller');

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
        this.io.on('connection', socketController)
    }

    start() {
        this.server.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }
}

module.exports = {
    Server
}