const jwt = require('jsonwebtoken')


const userGenerateAccessToken = async (adminData) => {
    const token = await jwt.sign(adminData, process.env.USER_PRIVATE_KEY, { expiresIn: '1h' })
    return token
}

const adminGenerateAccessToken = async (adminData) => {
    const token = await jwt.sign(adminData, process.env.ADMIN_PRIVATE_KEY, { expiresIn: '1h' })
    return token
}

const userVerifyToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (token) {
        jwt.verify(token, process.env.USER_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.json({ message: 'Token inválido' })
            } else {
                req.decoded = decoded,
                    next()
            }
        })
    } else {
        res.send('Acceso no autorizado o no se encuentra el token')
    }
}

const adminVerifyToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (token) {
        jwt.verify(token, process.env.ADMIN_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.json({ message: 'Token inválido' })
            } else {
                req.decoded = decoded,
                    next()
            }
        })
    } else {
        res.send('No se encuentra el token')
    }
}

module.exports = { userGenerateAccessToken, adminGenerateAccessToken, userVerifyToken, adminVerifyToken }
