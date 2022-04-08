const turnosModel = require('../Models/turnosModel')
const userModel = require('../Models/userModel')

const createTurno = async (req, res) => {

    const user = await userModel.findById(req.params.id)
    console.log(user)

    const turnoExists = await turnosModel.find().where({ email: user.email, date: req.body.date, time: req.body.time })

    console.log(turnoExists)
    if (turnoExists[0]) {
        res.json({ error: 'ya tiene un turno asignado para esa fecha y hora, elija otra fecha y hora' })
    } else {

        const capacidadMax = await turnosModel.find().where({ date: req.body.date, time: req.body.time })
        const peopleInput = req.body.people

        console.log('capmax', capacidadMax)

        if (capacidadMax != "") {

            for (const element of capacidadMax) {
                const elementPeople = element.people

                if (elementPeople + peopleInput > 200) {

                    res.json({ error: 'No quedan turnos disponibles para esa hora' })

                } else {



                    try {

                        const nombre = user.name
                        const apellido = user.lastName
                        const email = user.email

                        const data = {
                            email: email,
                            date: req.body.date,
                            time: req.body.time,
                            people: req.body.people
                        }

                        console.log('user', data)

                        const newTurno = new turnosModel(data)

                        newTurno.save().then(response => {

                            console.log({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time}hs, para ${req.body.people} persona/s ` })

                            res.json({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time}hs., para ${req.body.people} persona/s ` })

                        }).catch(error => {
                            console.log(error)
                            res.json({ error: 'No se pudo crear el turno' })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } else {
            try {

                const nombre = user.name
                const apellido = user.lastName
                const email = user.email

                const data = {
                    email: email,
                    date: req.body.date,
                    time: req.body.time,
                    people: req.body.people
                }

                console.log('user', data)

                const newTurno = new turnosModel(data)

                newTurno.save().then(response => {

                    console.log({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time}hs, para ${req.body.people} persona/s ` })

                    res.json({ message: `Turno creado para ${nombre} ${apellido} para el día ${req.body.date} a las ${req.body.time}hs., para ${req.body.people} persona/s ` })

                }).catch(error => {
                    console.log(error)
                    res.json({ error: 'No se pudo crear el turno' })
                })
            } catch (error) {
                console.log(error)
            }
        }

    }




}



const getTurnosByEmail = async (req, res) => {

    try {
        const user = await userModel.findById(req.params.id)

        if (user) {
            const turno = await turnosModel.find().where({ email: user.email })

            if (turno) {
                res.send(turno)
                // res.send({ message: `${user[0].name} ${user[0].lastName} posee el o los siguientes turnos:`, turno })
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
       const response = await turnosModel.findByIdAndDelete(req.params.id)
       console.log('response back',response)
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