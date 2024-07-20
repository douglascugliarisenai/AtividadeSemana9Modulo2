const { Router } = require('express')
const routes = new Router()

// Rotas
const cursosRoutes = require('./cursos.routes')
const professorRoutes = require('./professor.routes')
const usuariosRoutes = require('./usuarios.routes')
const loginRoutes = require('./login.routes')

// Middlewares
const validaToken = require('../middlewares/validaToken')

// Público
routes.use('/usuarios', usuariosRoutes)
routes.use('/login', loginRoutes)
routes.use(validaToken)

// Privado
routes.use('/cursos', cursosRoutes)
routes.use('/professores', professorRoutes)

module.exports = routes