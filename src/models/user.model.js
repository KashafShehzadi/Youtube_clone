import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, //This means that the username must be
        lowercase: true, //The value of path must be a string
        trim: true,
        index: true  //Creates a text index for this

    },
    email: {
        type: String,
        required: true,
        unique: true, //This means that the username must be
        lowercase: true, //The value of path must be a string
        trim: true,
    },
    fullname: {
        type: String,
        required: true,

        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudinary url for image
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url for image
    },
    watchHistor: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Why no password?"],
        minLength: [6, "Password is too short"],

    },
    refreshToken: {
        type: String
    }

}, {
    timestamps: true
}
)
//----------------------Hooks--------------------
//data k save hony sy just pahly yei hook chly gi or ku k time taken h to async aye ga 
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } else {
        next();
    }
})
//--------------------------Methods----------------------------
//custom method using schema to check password correctness
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
//AccessToken code generated using jwt sign 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
//Refresh token generation same like above
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}






export const User = mongoose.model("User", userSchema)