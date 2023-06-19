import mongoose from "mongoose";

const SpamCollection = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            min: 6,
            max: 50,
            unique:true,
        },
    },
    {
        timestamps: true
    }
)

const Spam = mongoose.model("SpamCollection", SpamCollection)
export default Spam;