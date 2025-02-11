import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            'User name is required'
        ],
        trim: true,
        maxLength: 50,
        minLenght: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        maxLength: 50,
        minLenght: 3,
        match: [
            /\S+@\S+\.\S+/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
    },
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;