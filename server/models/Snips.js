import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const snipSchema= new Schema ({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9\s'-]+$/.test(value);
            },
        }
    },
    notes: {
        type:String,
    },
    type: [{
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
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref:'Project'
    },
    series: {
        type: Schema.Types.ObjectId,
        ref: 'Series'
    }
},
{
    timestamps: true
})

snipSchema.index({ user: 1 });
snipSchema.index({ project: 1 });

export const Snip = model('Snip', snipSchema);