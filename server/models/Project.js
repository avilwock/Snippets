import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const projectSchema = new Schema ({
    project_name: {
        type: String,
        required: true,
        description: "Project name",
        trim: true
    },
    description: {
        type: String,
    },
    share_id: {
        type: String,
        unique: true
    },
    color: {
        type: String,
        match: /^#([0-9A-Fa-f]{3}){1,2}$/
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['owner', 'editor', 'viewer'],
            default: 'viewer'
        }
    }
]
},
{
    timestamps: true
});

const Project = model ('Project', projectSchema);

module.exports = Project;