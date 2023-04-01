import House from '../models/House';
import User from '../models/User';

class HouseController{


    async index(req,res){

        // pega o parametro la do query e armazena na variavel status
        const { status } = req.query;
        
        // Busca no banco House tudo que o status for o que esta na variavel status.
        const houses = await House.find({ status });

        return res.json(houses);
    }

    async store(req,res){

        const { fileName } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const house = await House.create({

            user: user_id,
            thumbnail: fileName,
            description,
            price,
            location,
            status,

        });

        return res.json(house);
    }

    async update(req,res){


        // Declara as variaveis e puxa la do insomia as informaçoes!
        const { filename } = req.file;
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(houses.user)){
            res.status(401).json({MSG: "Não Autorizado"});
        }

        //Busca no banco House o cadastro com o ID que o usuario passou como parametro que foi salva na variavel house_id
        await House.updateOne({_id: house_id},{
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })

        return res.send();
    }

    async destroy(req,res){

        const { house_id } = req.body;
        const { user_id } = req.headers;

        await House.findByIdAndDelete({_id: house_id});

        return res.json({message: "Excluido com sucesso"});
    }
}

export default new HouseController();