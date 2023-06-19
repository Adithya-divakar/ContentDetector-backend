import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            min: 6,
            max: 200,
        },
        userId: {
            type: String,
            required: true,
        }


    },
    {
        timestamps: true
    }
)
const Post = mongoose.model("Post", PostSchema)
export default Post;