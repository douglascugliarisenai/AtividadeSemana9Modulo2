const {Router} = require('express')
const usuarioController = require('../controllers/UsuarioController')

const usuariosRoutes = new Router()

usuariosRoutes.post('/', usuarioController.cadastrarUsuario)

module.exports = usuariosRoutes