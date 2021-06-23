'use strict'
const mongoose = require("mongoose")
const objectId = require('mongoose').objectId
const Schema = mongoose.Schema

var UsuariosSchema = Schema({
    usuario: String,
    password: String,
    rol: String,
    empresa: {type: Schema.ObjectId, ref:'empresas'}
})

module.exports = mongoose.model('usuarios', UsuariosSchema);