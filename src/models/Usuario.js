const { DataTypes } = require('sequelize')
const connection = require('../database/connection')
const { hashSync } = require('bcryptjs')

const Permissao = require('./Permissao')
const UsuarioPermissoes = require('./UsuarioPermissoes')

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// hooks

Usuario.belongsToMany(Permissao, {
    through: UsuarioPermissoes,
    foreignKey: 'usuario_id',
    otherKey: 'permissao_id'
})

Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario