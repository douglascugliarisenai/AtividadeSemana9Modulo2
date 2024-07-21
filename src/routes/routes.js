const { Router } = require('express')
const routes = new Router()

// Rotas
const cursosRoutes = require('./cursos.routes')
const professorRoutes = require('./professor.routes')
const usuariosRoutes = require('./usuarios.routes')
const loginRoutes = require('./login.routes')
const permissoesRoutes = require('./permissoes.routes')

// Middlewares
const validaToken = require('../middlewares/validaToken')
const verificarPermissao = require('../middlewares/verificarPermissao')


// Público
routes.use('/usuarios', usuariosRoutes)
routes.use('/login', loginRoutes)
routes.use(validaToken)

// Privado
routes.use('/cursos', verificarPermissao(['ADMIN', 'OPERADOR']),cursosRoutes)
routes.use('/professores',verificarPermissao(['ADMIN', 'OPERADOR']), professorRoutes)
routes.use('/permissoes',verificarPermissao(['ADMIN']), permissoesRoutes)

module.exports = routes