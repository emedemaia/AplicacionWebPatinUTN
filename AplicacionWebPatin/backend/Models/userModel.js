const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    vip:{
        type: String,
        default: 'false'
      
    },
    password: {
        type: String,
        required: true
    },
    
},
{
    timestamps: true,
  }
)



UserSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    },
});

const UserModel = mongoose.model('User', UserSchema)


module.exports = UserModel