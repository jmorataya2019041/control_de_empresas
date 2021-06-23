'use strict'
const express = require('express')
const empleadocontrolador = require('../controlador/empleado.controlador')
const md_autenticacion = require('../middlewares/authenticated')

const api = express.Router();
api.get('/empleados', md_autenticacion.ensureAuth, empleadocontrolador.obtenerEmpleados)
api.get('/empleadoId/:id', md_autenticacion.ensureAuth, empleadocontrolador.obtenerEmpleadoId)
api.get('/empleadoNombre/:nombre',md_autenticacion.ensureAuth, empleadocontrolador.obtenerEmpleadoNombre)
api.get('/empleadoPuesto/:puesto', md_autenticacion.ensureAuth, empleadocontrolador.obtenerEmpleadoPuesto)
api.get('/empleadoDepartamento/:departamento',md_autenticacion.ensureAuth, empleadocontrolador.obtenerEmpleadoDepartamento)
api.post('/agregarEmpleado', md_autenticacion.ensureAuth, empleadocontrolador.agregarEmpleado)
api.put('/editarEmpleado/:id', md_autenticacion.ensureAuth, empleadocontrolador.editarEmpleado)
api.delete('/eliminarEmpleado/:id', md_autenticacion.ensureAuth, empleadocontrolador.eliminarEmpleado)

module.exports = api;