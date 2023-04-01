
//metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar uma sessao
show: QUando queremos listar uma UNICA sessao
update: Quando queremos alterar alguma sessao
destroy: Quando queremos deletar uma sessao
*/

import User from "../models/User";

class SessionController{
    
    
    async store(req,res){

        const { email } = req.body;

        //verificando se usuario já existe
        let user = await User.findOne({email})

        //se nao existir ele cria no banco de dados, se existir ele retorna o usuario existente
        if(!user){
            user = await User.create({email})
        }

        return res.json(user);
    }
}

export default new SessionController();