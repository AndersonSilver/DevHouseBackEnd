// metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar uma sessao
show: QUando queremos listar uma UNICA sessao
update: Quando queremos alterar alguma sessao
destroy: Quando queremos deletar uma sessao
*/

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {

  async index(req,res){

    const session = await User.find();

    return res.json(session);
  }

  async destroy(req,res){

    const { session_id } = req.headers;

    await User.findByIdAndDelete({ _id: session_id });

    return res.send();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: 'Falha na validação.' });
    }

    // verificando se usuario já existe
    let user = await User.findOne({ email });

    // se nao existir ele cria no banco de dados, se existir ele retorna o usuario existente
    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
