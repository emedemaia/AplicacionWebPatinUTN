const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        value: true,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
  }
)


AdminSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    },
});


const AdminModel = mongoose.model('Admin', AdminSchema)

module.exports =  AdminModel