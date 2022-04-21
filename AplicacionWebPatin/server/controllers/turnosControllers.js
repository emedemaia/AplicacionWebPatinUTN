const turnosModel = require('../Models/turnosModel')
const userModel = require('../Models/userModel')
const nodemailer = require('nodemailer');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

const createTurno = async (req, res) => {

    const user = await userModel.findById(req.params.id)
    console.log(user)

    const turnoExists = await turnosModel.find().where({ email: user.email, date: req.body.date, time: req.body.time })

    console.log(turnoExists)
    if (turnoExists[0]) {
        res.json({ error: 'Ya tiene un turno asignado para esa fecha y hora, elija otra fecha y hora o vaya a la sección reservas hechas en caso de querer modificarlo.' })
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

                        console.log('user data', data)

                        const newTurno = new turnosModel(data)

                        newTurno.save().then(response => {


                            const fecha = new Date(req.body.date)
                            fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())


                            console.log({ message: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs, para ${req.body.people} persona/s.
                            Número de id del turno: ${response.id} ` })


                            res.json({ message: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs., para ${req.body.people} persona/s.
                            \nNúmero de id del turno: ${response.id} ` })


                        }).catch(error => {
                            console.log(error)
                            res.json({ error: 'No se pudo crear el turno' })
                        })


                        if (newTurno.save) {


                            try {

                                const fecha = new Date(req.body.date)
                                fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())

                                const obj = {
                                    from: 'Pista de Patín Retro <turnos@pistaretro.com.ar>',
                                    to: email,
                                    subject: 'Reserva de turno en Pista de Patín Retro',
                                    html: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs, para ${req.body.people} persona/s.
                                    Número de id del turno: ${newTurno.id} `
                                };


                                const transport = nodemailer.createTransport({
                                    host: "smtp.mailtrap.io",
                                    port: 2525,
                                    auth: {
                                        user: "755bd0cc9db987",
                                        pass: "e9b25e1901a5b4"
                                    }
                                });

                                // verify connection configuration
                                transport.verify(function (error, success) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log("Server is ready to take our messages");
                                    }
                                });

                                const info = await transport.sendMail(obj);

                                console.log("sendMail returned!");
                                console.log('Email sent: ' + info.response);

                            } catch (error) {
                                console.log("Error en el envío del mail", error);

                            }
                        }
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

                    const fecha = new Date(req.body.date)
                    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())

                    console.log({ message: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs, para ${req.body.people} persona/s. Número de id del turno: ${response.id} ` })

                    res.json({ message: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs., para ${req.body.people} persona/s\nNúmero de id del turno: ${response.id} ` })


                }).catch(error => {
                    console.log(error)
                    res.json({ error: 'No se pudo crear el turno' })
                })

                if (newTurno.save) {


                    try {

                        const fecha = new Date(req.body.date)
                        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())

                        const obj = {
                            from: 'Pista de Patín Retro <turnos@pistaretro.com.ar>',
                            to: email,
                            subject: 'Reserva de turno en Pista de Patín Retro',
                            html: `Turno creado para ${nombre} ${apellido} para el día ${fecha.toLocaleDateString('es-MX')} a las ${req.body.time}hs, para ${req.body.people} persona/s.
                            Número de id del turno: ${newTurno.id}`
                        };


                        const transport = nodemailer.createTransport({
                            host: "smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                                user: "755bd0cc9db987",
                                pass: "e9b25e1901a5b4"
                            }
                        });

                        // verify connection configuration
                        transport.verify(function (error, success) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("Server is ready to take our messages");
                            }
                        });

                        const info = await transport.sendMail(obj);

                        console.log("sendMail returned!");
                        console.log('Email sent: ' + info.response);

                    } catch (error) {
                        console.log("Error en el envío del mail", error);

                    }
                }
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
            const turno = await turnosModel.find().where({ email: user.email }).sort({ date: 1, time: 1 })

            if (turno[0]) {
                console.log(turno)
                res.json(turno)

            } else {
                console.log("el usuario no posee turnos")
                res.json({error: 'No tenés turnos reservados'})

            }
        } else {
            res.json('Usuario no encontrado')
        }
    } catch (error) {
        res.json({ error: 'Usuario no encontrado' })
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
        console.log('response back', response)
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