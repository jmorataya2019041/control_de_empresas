'use strict'

//Variables globales
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Cabeceras
app.use(cors());

//Importaciones de rutas
const autorizacion_rutas = require('./src/rutas/Autorizacion.rutas')
const empresas_rutas = require('./src/rutas/empresa.rutas')
const usuario_rutas = require('./src/rutas/usuario.rutas')
const empleado_rutas = require('./src/rutas/empleado.rutas')

//Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Carga de rutas localhost:3000/proyecto/ejemplo
app.use('/proyecto', autorizacion_rutas)
app.use('/proyecto', empresas_rutas)
app.use('/proyecto', usuario_rutas)
app.use('/proyecto', empleado_rutas)

//Exportar
module.exports = app;