const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'Control_Empresas_2019041'

exports.createToken = (user) =>{
    var payload = {
        sub: user._id,
        usuario: user.usuario,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().date(10,'days').unix(),
        empresa: user.empresa
    }
    return jwt.encode(payload,secret)
}