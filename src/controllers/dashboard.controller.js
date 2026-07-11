import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(req,res => {
    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized request") //check whether user logged in or not
    }

    const channelId = req.user._id //stores channel id
    
    const totalVideos = await Video.countDocuments({
        owner:channelId     //count how many videos belong to the user
    })
    //equivalent sql query => SELECT COUNT(*) FROM videos WHERE owner = channelId

    const totalSubscribers = await Subscription.countDocuments({
        channel: channelId
    })

    const totalViews = await Video.aggregate([  //counts total number of views  
        {
            $match: {
                owner = new mongoose.Types.ObjectId(channelId)
                // SELECT *
                // FROM videos
                // WHERE owner = channelId;
            }
        },
        {
            $group: {
                _id: null,
                totalViews: {
                    $sum : "$views"
                }
            }
        }
    ])

    const videoIds = await Video.find({
        owner: channelId
    }).select("_id")    //finds every video uploaded by the current user

    const totalLikes = await Like.countDocuments({
        video: {
            $in : videoIds.map(video=> video._id)  //counts likes received on all videos of the channel
        }
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos,
                totalSubscribers,
                totalViews: totalViews[0]?.totalViews || 0,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    )
})

const getChannelVideos = asyncHandler(req,res => {
    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized request")
    }
    
    const videos = await Video.find({
        owner : req.user._id
    })
    .sort({
        createdAt : -1
    })
    .populate(
        "owner",
        "fullName username avatar"
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Channel videos fetched successfully"
        )
    )
})


export {
    getChannelStats,
    getChannelVideos
}


