'use strict'
const objectID = require('mongodb').ObjectID
const EmpleadoModel = require('../modelos/empleados.model')
const EmpresaModel = require('../modelos/empresas.model')

//Función para agregar Empleado
exports.agregarEmpleado = (req, res)=>{
    var empleado = new EmpleadoModel();
    const{nombre,puesto, departamento} = req.body;
    if(req.user.empresa){
        if(nombre && puesto && departamento){
            empleado.nombre = nombre;
            empleado.puesto = puesto;
            empleado.departamento = departamento;
            empleado.empresa = req.user.empresa;
            EmpresaModel.findOne({"_id": objectID(req.user.empresa.toString())},(err, empresaEncontrada)=>{
                if(err){
                    return res.status(500).send({mensaje: 'Error en la petición'})
                }else if(empresaEncontrada){
                    EmpleadoModel.find({$or: [{
                        nombre: empleado.nombre,
                        puesto: empleado.puesto,
                        departamento: empleado.departamento,
                        enmpresa: empleado.empresa,
                    }]},(err, empleado)=>{
                        if(err){
                            return res.status(500).send({mensaje: 'Error en la petición'})
                        }else if(empleado && empleado.length >=1){
                            return res.status(500).send({mensaje: 'El empleado ya existe'})
                        }else{
                            empleado.save((err, empleadoGuardado)=>{
                                if(err){
                                    return res.status(500).send({mensaje: 'No se ha podido guardar el empleado'})
                                }else{
                                    return res.status(200).send({Empleado: empleadoGuardado})
                                }
                            })
                        }
                    })
                }else{
                    return res.status(500).send({mensaje: 'Empresa no encontrada'})
                }
            })
        }else{
            return res.status(500).send({mensaje: 'No completo los parámetros'})
        }
    }else{
        return res.status(500).send({mensaje: 'No tiene el rol de Autorización'})
    }
}

//Función para editar Empleado
exports.editarEmpleado = (req, res)=>{
    const {id} = req.params;
    const {nombre, puesto, departamento} = req.body;
    if(req.user.empresa){
        EmpleadoModel.findOneAndUpdate({_id: objectID(id.toString()), empresa: req.user.empresa},
        {$set: {
            nombre: nombre,
            puesto: puesto,
            departamento: departamento,
            empresa: req.user.empresa,
        }}, {new: true},(err, empleadoEditado)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error en la petición'})
            }else if(!empleadoEditado){
                return res.status(500).send({mensaje: 'Error al editar empleado!!!'})
            }else{
                return res.status(200).send({Empleado_Editado: empleadoEditado})
            }
        })
    }else{
        return res.status(500).send({mensaje: 'No tiene el rol de Autorización'})
    }
}

//Función para eliminar Empleado
exports.eliminarEmpleado = (req, res)=>{
    const {id} = req.params
    EmpleadoModel.find({_id: objectID(id)},(err, empleado)=>{
        if(err){
            return res.status(500).send({mensaje: 'Error en la petición'})
        }else if(empleado && empleado.length >= 1){
            if(req.user.empresa === empleado[0].empresa.toString()){
                EmpleadoModel.findByIdAndRemove({_id: objectID(id.toString())},(err, empleadoEliminado)=>{
                    if(err){
                        return res.status(500).send({mensaje: 'Error en la petición'})
                    }else{
                        return res.status(200).send({Empleado_Eliminado: empleadoEliminado})
                    }
                })
            }else{
                return res.status(500).send({Alerta: 'No puede eliminar empleados de otro empresa'})
            }
        }else{
            return res.status(500).send({mensaje: 'El empleado no existe'})
        }
    })
}


//BÚSQUEDAS: 

//Función para obtener empleados
exports.obtenerEmpleados = (req, res)=>{
    const empresaId = req.user.empresa;
    if(empresaId){
        EmpleadoModel.find({"empresa": objectID(empresaId)}, (err, empresa)=>{
            if(err){
                return res.status(500).send({mensaje: 'No puede obtener empleados de otra empresa'})
            }else if(empresa && empresa.length >=1){
                return res.status(200).send({Empleados: empresa})
            }
        })
    }else{
        return res.status(500).send({Alerta: 'Error!!'})
    }
}

//Función para obtener un empleado por ID
exports.obtenerEmpleadoId = (req, res)=>{
    const {id} = req.params;
    if(req.user.empresa){
        EmpleadoModel.findById({_id: objectID(id.toString())},(err, empleado)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error en la petición'})
            }else if(empleado.empresa.toString() === req.user.empresa.toString()){
                return res.status(200).send({Empleado: empleado})
            }else{
                return res.status(500).send({mensaje: 'No puede obtener empleados de otra empresa'})
            }
        })
    }else{
        return res.status(500).send({Alerta: 'Error!!!!'})
    }
}

//Función para obtener empleado por nombre
exports.obtenerEmpleadoNombre = (req, res)=>{
    const {nombre} = req.params;
    if(req.user.empresa){
        EmpleadoModel.find({"nombre":{$regex: nombre.toString(), $options: 'i'}, "empresa":objectID(req.user.empresa)},(err, empleado)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error en la petición'})
            }else if(empleado && empleado.length>=1){
                return res.status(200).send({Empleado: empleado})
            }else{
                return res.status(500).send({Alerta: 'No puede obtener el empleado de otra empresa'})
            }
        })
    }else{
        return res.status(500).send({Alerta: 'Error!!!!'})
    }
}

//Función para obtener empleado por puesto
exports.obtenerEmpleadoPuesto = (req, res)=>{
    const {puesto} = req.params;
    if(req.user.empresa){
        EmpleadoModel.find({"puesto":{$regex: puesto.toString(), $options: 'i'}, "empresa": objectID(req.user.empresa)},(err, empleado)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error en la petición'})
            }else if(empleado && empleado.length>=1){
                return res.status(200).send({Empleado: empleado})
            }else{
                return res.status(500).send({mensaje: 'No puede obtener el empleado de otra empresa'})
            }
        })
    }else{
        return res.status(500).send({Alerta: 'Error!!!!'})
    }
}

//Función para obtener empledo por departamento
exports.obtenerEmpleadoDepartamento = (req, res)=>{
    const {departamento} = req.params;
    if(req.user.empresa){
        EmpleadoModel.find({"departamento": {$regex: departamento.toString(), $options: 'i'}, "empresa": objectID(req.user.emprsa)},(err,empleado)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error en la petición'})
            }else if(empleado && empleado.length>=1){
                return res.status(200).send({Empleado: empleado})
            }else{
                return res.status(500).send({mensaje: 'No puede obtener el empleado de otra empresa'})
            }
        })
    }else{
        return res.status(500).send({Alerta: 'Error!!!!'})
    }
}