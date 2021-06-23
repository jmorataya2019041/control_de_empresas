'use strict'
const bcrypt = require('bcrypt-nodejs')
const EmpresaModel = require('../modelos/empresas.model')
const EmpleadoModel = require('../modelos/empleados.model')
const UsuarioModel = require('../modelos/usuario.model')
const ObjectID = require('mongodb').ObjectID;
const pdfGenerador = require('../utilidades/pdf/pdf.generador')

//Función para obtener empresas
exports.obtenerEmpresas = (req, res)=>{
    EmpresaModel.find((err, empresaEncontrada)=>{
        if(err){
            return res.status(500).send({mensaje: 'Error en la petición'})
        }else if(!empresaEncontrada){
            return res.status(500).send({mensaje: 'No se han podido encontrar las empresas'})
        }else{
            return res.status(200).send({Empresas: empresaEncontrada})
        }
    })
}

//Función para obtener empleados
exports.obtenerEmpleados = (req, res)=>{
    const idEmpresa = req.user.empresa;
    EmpresaModel.countDocuments({empresa: ObjectID(id)},(err, numero)=>{
        if(err){
            return res.status({mensaje: 'Error en la petición'})
        }
        return res.status(200).send([{status: 'Empleados',}, {'Número de empleados': numero},])
    })
}

//Función para agregar Empresas
exports.agregarEmpresa = (req, res)=>{
  if (req.user.rol === "Admin") {
    let empresa = new EmpresaModel();
    let user = new UsuarioModel();
    const { nombre, usuario, password } = req.body;
    console.log(nombre);
    if (nombre, usuario, password) {
      user.password = encryptPassword(password);
      empresa.nombre = nombre;
      user.usuario = usuario;
      user.rol = "user";
      UsuarioModel.find({usuario: usuario, rol: user.rol}, (err, userFind) => {
        if(err){
          console.log(err);
        }else if(userFind && userFind.length >= 1){
          res.status(500).send({status: 'User Name already exists'})
        }else{
          EmpresaModel.find({$or: [{ nombre: empresa.nombre }]}, (err, companyFind) => {
            if (err) {
              res.status(500).send({ status: "error on create the company" });
            } else if (companyFind && companyFind.length >= 1) {
              res.status(500).send({ status: "Company already exists in DB" });
            } else {
              company.save((err, company) => {
                if(err){
                  console.log(err)
                }else {
                  user.empresa = empresa._id;
                  user.save((err, user) => {
                    res.status(200).send({
                      empresa: empresa,
                      user: user
                    })
                  })
                }
              })
            }
          })
        }
      })
    } else {
      res.status(500).send({ status: "missing some parameters" });
    }
  } else {
    res.status(401).send({ status: "Access denied insufficient permissions" });
  }
}

//Método para encriptar la contraseña
const encryptPassword = (password)=>{
    return new Promise((resolver, rechazar)=>{
        bcrypt.hash(password, null, null, (err, passEncrypt)=>{
            if(err){
                rechazar(new Error("No se ha podido encriptar su contraseña"))
            }else{
                resolver(passEncrypt)
            }
        })
    })
}

//Método para actualizar Empresa
exports.editarEmpresa = (req, res)=>{
    if(req.user.rol === 'admin'){
        const {id} = req.params
        const {nombre} = req.body
        if(nombre){
            EmpresaModel.findByIdAndUpdate({_id: ObjectID(id.toString())},
            {$set: {nombre: nombre}},
            {new: true},(err,empresaEditada)=>{
                if(err){
                    return res.status(500).send({mensaje: 'Error en la petición'})
                }else{
                    return res.status(200).send({Empresa_Editada: empresaEditada})
                }
            })
        }else{
            return res.status(500).send({mensaje: 'No completo los parametros'})
        }
    }else{
        return res.status(500).send({mensaje: 'No tiene el rol de autorización'})
    }
}

//Método para eliminar Empresa
exports.eliminarEmpresa = (req, res)=>{
    if(req.user.rol === 'admin'){
        const {id} = req.params;
        EmpresaModel.findByIdAndRemove({_id: ObjectID(id.toString())},(err, empresaEliminada)=>{
            if(err){
                return res.status(500).send({mensaje: "No se ha podido eliminar la empresa"})
            }else{
                return res.status(200).send({Empresa_Eliminada: empresaEliminada})
            }
        })
    }else{
        return res.status(500).send({mensaje: 'No tiene el rol de autorización'})
    }
}

//Método para crear el pdf
exports.generarPDF = (req, res)=>{
  var obj = [];
  const empresaId = req.user.empresa
  EmpleadoModel.find({"empresa": ObjectID(empresaId)}, (err, datos)=>{
    if(err){
      return res.status(500).send({mensaje:  'Error en la petición'})
    }else if(datos && datos.length>=1){
      obj = datos;
    }else{
      return res.status(500).send({Alerta: 'Error!!!!!!'})
    }
  })
  pdfGenerador.generarPDF(obj).then(datos => res.downloand(datos.filename))
}