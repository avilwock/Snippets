import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const projectSchema = new Schema ({
    project_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    share_id: {
        type: String,
        unique: true,
        sparse: true
    },
    color: {
        type: String,
        match: /^#([0-9A-Fa-f]{3}){1,2}$/
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: {
        type: [
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
        ],
        default: []
    },
},
{
    timestamps: true
});

projectSchema.index({ owner: 1 });
projectSchema.index({ share_id: 1 });

const Project = model ('Project', projectSchema);

export default Project;