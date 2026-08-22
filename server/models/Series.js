import mongoose from "mongoose"
const { Schema, model } =mongoose;

const seriesSchema = new Schema ({
    seriesTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},{
    timestamps: true
    
})

seriesSchema.index({user: 1});

export const Series = model('Series', seriesSchema);


