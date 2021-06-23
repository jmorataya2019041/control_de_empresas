'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var EmpleadosSchema = Schema({
    nombre: String,
    puesto: String,
    departamento: String,
    empresa: {type: Schema.ObjectId, ref:'empresas'}
})

module.exports = mongoose.model('empleados', EmpleadosSchema)