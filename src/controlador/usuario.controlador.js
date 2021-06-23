'use strict'
const UsuarioModel = require('../modelos/usuario.model')
const bcrypt = require('bcrypt-nodejs')

//Función para obtener Administradores
exports.obtenerAdmin = (req, res)=>{
    UsuarioModel.find((err, admins)=>{
        if(err){
            return res.status(500).send({mensaje: 'Error en la petición'})
        }else if(!admins){
            return res.status(500).send({mensaje: 'No se ha podido encontrar al Admininstrador'})
        }else{
            return res.status(200).send({Administradores: admins})
        }
    })
}

//Función para agregar Administrador
exports.agregarAdmin = (usuario, password, rol)=>{
    var userModel = new UsuarioModel();
    if(usuario && password && rol){
        userModel.usuario = usuario
        userModel.password = password;
        userModel.rol = rol;
        UsuarioModel.find({$or: [
            {usuario: userModel.usuario,
            rol: userModel.rol}
        ]}).exec((err, adminEncontrado)=>{
            if(err){
                console.log(err);
            }else if(adminEncontrado && adminEncontrado.length >=1){
                console.log({mensaje: 'El registro es existente'})
            }else{
                bcrypt.hash(userModel.password, null, null, (err, passEncrypt)=>{
                    userModel.password = passEncrypt
                    userModel.save((err, adminGuardado)=>{
                        if(err){
                            console.log('Error')
                        }else{
                            console.log(adminGuardado)
                        }
                    })
                })
            }
        })
    }else{
        console.log({mensaje: 'No ha agregado todos los parámetros'})
    }
}