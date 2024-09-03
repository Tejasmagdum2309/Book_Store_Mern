import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    logedin :{
        type : Boolean,
        default : false
    },
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.name,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:"1h"
        }
    )
}



const User = mongoose.model('User', userSchema);

export {User}
