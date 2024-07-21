const { verify } = require("jsonwebtoken")

function validaToken(req,res,next){
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(400).json({ mensagem: 'Token obrigatorio' })
        }

        const tokenValido = token.split(' ')[1]
    
        const decoded = verify(tokenValido, process.env.JWT_SECRET)

        req.usuarioId = decoded.id
    
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro ao validar o token: '+ error.message })
    }
   
}

module.exports = validaToken