'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'Control_Empresas_2019041'

exports.ensureAuth = (req, res, next) =>{
    if(!req.headers.authorization){
        res.status(500).send({mensaje: 'No tiene el encabezado de autorización'})
    }
    var token = req.headers.authorization.replace(/['"]+/g,'')

    try{
        var payload = jwt.encode(token, secret)
        if(payload.exp <= moment().unix){
            return res.status(500).send({mensaje: 'El token ha expirado'})
        }
    }catch(err){
        console.log(err)
        res.status(500).send({mensaje: 'Token inválido'})
    }
}