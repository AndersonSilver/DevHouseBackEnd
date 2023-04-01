import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController{
    async index(req,res){
        // pega o parametro la do query e armazena na variavel status
        const { status } = req.query;
        
        // Busca no banco House tudo que o status for o que esta na variavel status.
        const houses = await House.find({ status });
        return res.json(houses);
    }

    async store(req,res){

        const schema = Yup.object().shape({

            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });


        const { fileName } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;


        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Falha na validação."})
        }

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

        const schema = Yup.object().shape({

            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });


        // Declara as variaveis e puxa la do insomia as informaçoes!
        const { filename } = req.file;
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Falha na validação."})
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

        // const user = await User.findById(user_id);
        // const houses = await House.findById(house_id);

        // if(String(user._id) !== String(houses.user)){
        //     res.status(401).json({MSG: "Não Autorizado"});
        // }

        await House.findByIdAndDelete({_id: house_id});

        return res.json({message: "Excluido com sucesso"});
    }
}

export default new HouseController();