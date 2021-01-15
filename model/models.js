
const mongooes = require('mongoose')

const addressSchema = {
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    place:{
        type:String,
        required: true
    }

}

const Address = mongooes.model('Address',addressSchema)

module.exports(Address)