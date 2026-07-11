import mongoose from "mongoose"
import { Like } from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleVideoLike = asyncHandler(async(req,res) => {
    const {videoId} = req.params

    if(!req.user?._id){
        throw new ApiError(401,"Unauthorized Access")
    }

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400, "Invalid video id")
    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })

    if(existingLike){
        await existingLike.deleteOne()

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Video unliked successfully"
            )
        )
    }

    await Like.create({
        video: videoId,
        likedBy: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video liked successfully"
        )
    )
})


const toggleCommentLike = asyncHandler(async(req,res) => {
    const {commentId} = req.params

    if(!req.user?._id){
        throw new ApiError(401,"Unauthorized reqest")
    }

    if(!mongoose.Types.ObjectId.isValid(commendId)){
        throw new ApiError(400, "Invalid comment id")
    }

    const existingLike = await Like.findOne({
        commment : commentId,
        likedBy : req.user._id
    })

    if(existingLike){
        await existingLike.deleteOne()

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Comment unliked successfully"
            )
        )
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment Liked Successfully"
        )
    )
})

const toggleTweetLike = asyncHandler(async(req,res)=> {
    
    const {tweetId} = req.params

    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized Access")
    }

    if(!mongoose.Types.ObjectId.isValid(tweetId)){
        throw new ApiError(400,"Invalid Tweet id")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        LikeBy : req.user._id
    })
    

    if(existingLike){
        await existingLike.deleteOne()

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Tweet unliked successfully"
            )
        )
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Tweet liked successfully"
        )
    )

})

const getLikedVideos = asyncHandler(async(req,res) => {
    if(!req.user._id){
        throw new ApiError(401,"Unauthorized Request")
    }

    const likedVideos = await Like.aggregate([
        {
            $match: {
                    likedBy : new mongoose.Types.ObjectId(req.user._id),
                    video: {
                        $exists: true
                    }
                }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as : "video"
            }
        },
        {
            $unwind: "$video"
        },
        {
            $replaceRoot: {
                newRoot: "$video"
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Liked videos fetched successfully"
        )
    )
})


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}

