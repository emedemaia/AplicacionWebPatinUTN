const turnosModel = require('../Models/turnosModel')
const userModel = require('../Models/userModel')

const createTurno = async (req, res ) => {

    const user = await userModel.findById(req.params.id)
console.log(user)

   try{

        const nombre = user.name
        const apellido = user.lastName
        const email = user.email

        const data = {
            email: email,
            date: req.body.date,
            time: req.body.time
        }

        console.log('user', data)

        const newTurno = new turnosModel(data)

        newTurno.save().then(response => {

          console.log({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time} ` })
          
           res.json({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time}hs. ` })

        }).catch(error => {
            console.log(error)
            res.json({ error: 'No se pudo crear el turno' })
        })
    } catch(error) {
        console.log(error)
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

const updateTurnoById = async (req, res) => {
    try {
        await turnosModel.findByIdAndUpdate(req.params.id, req.body)
        res.send('Su turno ha sido modificado correctamente')
    } catch (error) {
        res.send('Ha ocurrido un error, intente nuevamente')
    }
}

module.exports = { getAllTurnos, createTurno, getTurnosByEmail, deleteTurnoById, updateTurnoById }