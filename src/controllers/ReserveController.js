// Importação do banco de dados para ser utilizado na classe ReserveController

import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';


class ReserveController{

    async index(req,res){

        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id}).populate('house');

        return res.json(reserves);
    }

    async store(req,res){

        // declarando as variaveis do tipo const, e recebendo as informaçoes enviado pelo 
        // insomia e/ou Postman atraves de headers, body e paramns

        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        // Desclarado variavel do tipo const que faz uma busca no banco de dados House 
        // atraves da variavel que foi informado no insomia (house_id).

        const house = await House.findById(house_id);

        // se no banco de dados House nao existe o id da casa é dado um returno de casa não encontrada.
        if(!house){
            return res.status(400).json({error: "Casa não encontrada"});
        }

        // Se o status daquela casa for false e dado como retorno que a solicitação de reserva nao esta disponivel
        if(house.status !== true){
            return res.status(400).json({error: "Solicitação indísponivel"});
        }

        // Desclarado variavel do tipo const que faz uma busca no banco de dados User 
        // atraves da variavel que foi informado no insomia (user_id), na aba headers.

        const user = await User.findById(user_id);

        // se o ID do usuario que esta fazendo a reserva for igual a ID do usuario que criou a divulgação da casa for igual, 
        // da um retorno de reserva na permitida.

        if(String(user._id) === String(house.user)){
            return res.status(401).json({error: "Reserva não permitida"});
        }

        // depois de ser executado todas as verificações em cima e efetuada a reserva abaixo.

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        // Retornando a reserva.
        return res.json(reserve);
    }

    async destroy(req,res){

        const {reserve_id} = req.headers;

        await Reserve.findByIdAndDelete({ _id: reserve_id });

        return res.send();
    }
}

export default new ReserveController();