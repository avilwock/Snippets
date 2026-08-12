import mongoose from 'mongoose'
const { Schema, model } = mongoose

const taskSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    type: {
    type: String,
    enum: [
        'Research',
        'Drafting',
        'Editing',
        'Publishing',
        'General'
    ],
    default: 'General'
    },
    due_date: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }
}, {
    timestamps: true
});

taskSchema.index({project: 1 });
taskSchema.index({ user: 1 })

export const Task = model('Task', taskSchema);