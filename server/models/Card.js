import mongoose from 'mongoose'
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
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
});

cardSchema.index({ project: 1 });
cardSchema.index({ owner: 1 });

const Card = model ('Card', cardSchema);

export default Card