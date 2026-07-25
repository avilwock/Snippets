import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const projectSchema = new Schema ({
    project_name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            //a function that takes the value description field v
            validator: function (v) {
                //checks that v exists, the length is greater than 0 after the white space it trimmed
                return v && v.trim().length > 0;
            },
            message: 'Title cannot be empty',
        },
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        match: /^#([0-9A-Fa-f]{3}){1,2}$/
    },
    genre: {
        type: String,
        enum: ['Fantasy', 'Science-Fiction', 'Mystery', 'Thriller & Suspense', 'Horror', 'Historical Fiction', 'Romance', 'TTRPG', 'Other'],
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
});

projectSchema.index({ user: 1 });

export const Project = model('Project', projectSchema);