'use strict'
const express = require('express')
const usuariocontrolador = require('../controlador/usuario.controlador')

const api = express.Router();
api.get('/obtenerAdmin', usuariocontrolador.obtenerAdmin);


module.exports = api;