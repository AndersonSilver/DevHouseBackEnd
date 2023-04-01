import express from 'express'; // importando o express
import mongoose from 'mongoose';// importando o mongoose para utilizar banco de dados
import routes from './routes';//importando as rotas
import path from 'path';

class app{
    constructor(){
        this.server = express();

        //Fazendo a conexão com obanco de dados,
        mongoose.connect('mongodb+srv://andersonsilveira:699130@anderson.s8l92yc.mongodb.net/AndersonSilveira?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        this.middlewares();
        this.routes();
    }

    middlewares(){

        this.server.use(

            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))

        );


        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new app().server;