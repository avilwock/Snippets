const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const cardSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['snippet', 'idea', 'scene', 'character', 'worldbuilding'],
        required: true
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
});

const Card = model ('Card', cardSchema);

module.exports = Card