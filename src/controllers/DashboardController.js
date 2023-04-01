
//Importa o banco de dados House para poder ser utilizado na função "SHOW"
import House from "../models/House";

class DashBoardController{

    async show(req,res){

        // declara uma função do tipo const que busca la no headers o que o usuario digitou;
        const { user_id } = req.headers;

        // declara uma variavel do tipo const que utiliza o FIND("faz uma busca") verifica 
        // se no banco de dados de House se possui algum cadastro do mesmo ID que o usuario inseriu.
        const houses = await House.find({ user: user_id});


        // Retorna o a variavel que contempla a busca realizada acima.
        return res.json(houses);
    }
}


// Exporta o DashBoardController para poder ser coletada no arquivo routes.js
export default new DashBoardController();