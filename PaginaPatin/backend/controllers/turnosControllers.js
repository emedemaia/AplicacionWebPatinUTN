const turnosModel = require('../Models/turnosModel')
const userModel = require('../Models/userModel')

const createTurno = async (req, res) => {

    const user = await userModel.find().where({ email: req.body.email })

    if (user[0]) {

        const nombre = user[0].name
        const apellido = user[0].lastName

        const newTurno = new turnosModel(req.body)

        newTurno.save().then(response => {
            res.send({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.hour} ` })
        }).catch(error => {
            console.log(error)
            res.send({ error: 'No se pudo crear el turno' })
        })
    } else {
        res.send({ message: 'usuario no encontrado' })
    }
}

const getTurnosByEmail = async (req, res) => {
    try {
        const user = await userModel.find().where({ email: req.body.email })

        if (user[0]) {
            const turno = await turnosModel.find().where({ email: req.body.email })
            if (turno[0]) {
                res.send({ message: `${user[0].name} ${user[0].lastName} posee el o los siguientes turnos:`, turno })
            } else {
                res.send('El usuario no posee turnos')
            }
        } else {
            res.send('Usuario no encontrado')
        }
    } catch (error) {
        res.send({ error: 'Usuario no encontrado' })
    }

}


const getAllTurnos = (req, res) => {
    turnosModel.find().then(response => {
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
}

const deleteTurnoById = async (req, res) => {
try {
    await turnosModel.findByIdAndDelete(req.params.id)
    res.send('Turno eliminado correctamente')
} catch (error) {
    res.send('No se ha podido eliminar el turno, intente nuevamente')
}
}

const updateTurnoById = async (req, res) =>{
    try {
        await turnosModel.findByIdAndUpdate(req.params.id, req.body)
        res.send('Su turno ha sido modificado correctamente')
    } catch (error) {
        res.send('Ha ocurrido un error, intente nuevamente')
    }
}

module.exports = { getAllTurnos, createTurno, getTurnosByEmail, deleteTurnoById, updateTurnoById }