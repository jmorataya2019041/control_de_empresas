'use strict'
const express = require('express')
const autorizacioncontrolador = require('../controlador/Autorizacion.controlador')

const api = express.Router();
api.post('/login', autorizacioncontrolador.login)

module.exports = api;