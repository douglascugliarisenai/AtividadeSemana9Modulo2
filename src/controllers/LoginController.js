const Usuario = require('../models/Usuario')
const {compareSync} = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class LoginController {
    async login(req, res) {
        try {
            const dados = req.body

            if (!dados.email || !dados.password) {
                return res.status(400).json({ mensagem: 'Email e senha obrigatorios' })
            }

            const usuario = await Usuario.findOne({ where: { email: dados.email } })
    
            if (!usuario) {
                return res.status(400).json({ mensagem: 'Conta não encontrada' })
            }

            if (!compareSync(dados.password, usuario.password_hash)) {
                return res.status(400).json({ mensagem: 'Conta nao encontrada com esse email ou senha' })
            }

            const token = sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

            return res.json({ 'Authorization': token, 'Nome': usuario.nome })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao efetuar o login' })
        }
    }
}   

module.exports = new LoginController()