const Usuario = require('../models/Usuario')

class UsuarioController {
    async cadastrarUsuario(req, res) {
        try {
            const padraoEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
            const dados = req.body

            if (!dados.nome) {
                return res.status(400).json({ mensagem: 'Nome obrigatorio' })
            }

            if (!dados.email) {
                return res.status(400).json({ mensagem: 'Email obrigatorio' })
            }

            if (!padraoEmail.test(dados.email)) {
                return res.status(400).json({ mensagem: 'Email invalido' })
            }

            if(!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
                return res.status(400).json({ mensagem: 'Senha deve ter entre 8 e 16 caracteres' })
            }

            const emailExists = await Usuario.findOne({ where: { email: dados.email } })

            if (emailExists) {
                return res.status(400).json({ mensagem: 'Email ja existe' })
            }

            const usuario = await Usuario.create({ nome: dados.nome, email: dados.email, password_hash: dados.password })

            return res.status(201).json({ success: 'Usuário criado com sucesso!', 
                nome: usuario.nome,
                email: usuario.email,
                createAt: usuario.createAt
             })    
            
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o usuário' })
        }
    }
}

module.exports = new UsuarioController()