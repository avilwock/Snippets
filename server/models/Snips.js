import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const snipsSchema= new Schema ({
    keyword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9\s'-]+$/.test(value);
            },
        }
    },
    description: {
        type:String,
    },
    type: {
        type:String,
        enum: [
            'Character',
            'Scene',
            'Dialogue',
            'Worldbuilding',
            'Plot',
            'Setting',
            'Misc',
        ],
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref:'Project'
    }
},
{
    timestamps: true
})

snipsSchema.index({ user: 1 });
snipsSchema.index({ project: 1 });

export const Snips = model('Snips', snipsSchema);