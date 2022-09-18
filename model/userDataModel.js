const mongoose = require("mongoose")

const detailsSchema = mongoose.Schema({
    hotelName:{
        type:String,
        required:true
    },
    rooms:{
        type:Number,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    extras:{
        type:String,
    },
    contactName:{
        type:String,
    },
    contact:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    amount:{
        type:Number,
        required:true
    },
    discription:{
        type:String,
    },
    createdAt:{
        type:Date
    },
    id:{
        type:String
    }
})

const detailsModel = mongoose.model("details", detailsSchema)
module.exports = detailsModel