const mongoose = require('mongoose')

const turnosSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        people: {
            type: Number,
            required: true
        },
      
    },
    {
        timestamps: true,
    }
)

turnosSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    },
});

const turnos = mongoose.model('Turnos', turnosSchema)

module.exports = turnos