import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken" // encryption //this is a token whoever has it will receive the data
import bcrypt from "bcrypt" //for passwrod encryption


// console.log(process.env.ACCESS_TOKEN_EXPIRY)


const userSchema = new Schema(
    {

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudnary url cloud service will provide urls,
            required: true
        },
        coverimage: {
            type: String
        },
        watchhistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"

            }
        ],
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refereshtoken: {
            type: String

        },
    },
    {
        timestamps: true
    }
)  //multiple objects will come here


// userSchema.pre("save",()=>{}) //dont use this because it doesnt have this keyword access

// \/
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); //isModified is ibuilt method 
    this.password = bcrypt.hash(this.password, 10) //how many times it will hash
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) //has own method compare
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(  //will generate access token
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

// will have less data
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(  //will generate access token
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);