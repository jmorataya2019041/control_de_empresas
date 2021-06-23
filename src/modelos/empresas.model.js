'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var EmpresasSchema = Schema({
    nombre: String
})

module.exports = mongoose.model('empresas', EmpresasSchema)