'use strict'
const express = require('express')
const empresacontrolador = require('../controlador/empresa.controlador')
const md_autenticacion = require('../middlewares/authenticated')

const api = express.Router();
api.get('/obtenerEmpresas',empresacontrolador.obtenerEmpresas)
api.get('/obtenerEmpleados', md_autenticacion.ensureAuth, empresacontrolador.obtenerEmpleados)
api.post('/agregarEmpresa', md_autenticacion.ensureAuth,empresacontrolador.agregarEmpresa);
api.put('/editarEmpresa/:id', md_autenticacion.ensureAuth, empresacontrolador.editarEmpresa)
api.delete('/eliminarEmpresa/:id',md_autenticacion.ensureAuth,empresacontrolador.eliminarEmpresa)
api.get('/generarPDF/pdf',md_autenticacion.ensureAuth, empresacontrolador.generarPDF)

module.exports = api;