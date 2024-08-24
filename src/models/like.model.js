import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
            required: true,
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema)  