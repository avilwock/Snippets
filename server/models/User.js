const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: "Invalid Username Format"
        },
    },
    displayName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Name must contain only letters and hyphens'
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
          validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            },
            message: 'Invalid Email Format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    photoUrl: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    lastLoginAt: {
        type: Date,
        default:null
    }
},
{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
  
module.exports = User;
