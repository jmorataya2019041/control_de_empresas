'use strict'
const crearUsuario = require('./src/controlador/usuario.controlador')
const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyecto', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Conectado a la base de datos');
    crearAdmin();

    app.listen(3000, function(){
        console.log('Está funcionando en el puerto 3000');
    })

}).catch(err => console.log(err))

const crearAdmin = ()=>{
    crearUsuario.agregarAdmin('Admin', '123456','admin')
}