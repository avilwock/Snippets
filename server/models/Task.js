import mongoose from 'mongoose'
const { Schema, model } = mongoose

const taskSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo'
    },
    due_date: {
        type: Date,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }
}, {
    timestamps: true
});

const Task = model ('Task', taskSchema);

module.exports = Task;