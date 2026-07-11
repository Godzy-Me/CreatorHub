import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query

    const matchStage = {}

    if (query) {
        matchStage.title = {
            $regex: query,
            $options: "i"
        }
    }

    if (userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user id")
        }

        matchStage.owner = new mongoose.Types.ObjectId(userId)
    }

    const aggregate = Video.aggregate([
        {
            $match: matchStage
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        }
    ])

    const options = {
        page: Number(page),
        limit: Number(limit)
    }

    const videos = await Video.aggregatePaginate(
        aggregate,
        options
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request")
    }

    if (!title?.trim() || !description?.trim()) {
        throw new ApiError(
            400,
            "Title and description are required"
        )
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required")
    }

    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required")
    }

    const uploadedVideo = await uploadOnCloudinary(
        videoLocalPath
    )

    if (!uploadedVideo) {
        throw new ApiError(
            500,
            "Failed to upload video"
        )
    }

    const uploadedThumbnail = await uploadOnCloudinary(
        thumbnailLocalPath
    )

    if (!uploadedThumbnail) {
        throw new ApiError(
            500,
            "Failed to upload thumbnail"
        )
    }

    const video = await Video.create({
        title: title.trim(),
        description: description.trim(),
        videoFile: uploadedVideo.url,
        thumbnail: uploadedThumbnail.url,
        duration: uploadedVideo.duration,
        owner: req.user._id
    })

    const createdVideo = await Video.findById(video._id).populate(
        "owner",
        "fullName username avatar"
    )

    return res.status(201).json(
        new ApiResponse(
            201,
            createdVideo,
            "Video published successfully"
        )
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId).populate(
        "owner",
        "fullName username avatar"
    )

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Video fetched successfully"
        )
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request")
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    if (title?.trim()) {
        video.title = title.trim()
    }

    if (description?.trim()) {
        video.description = description.trim()
    }

    const thumbnailLocalPath = req.file?.path

    if (thumbnailLocalPath) {
        const uploadedThumbnail = await uploadOnCloudinary(
            thumbnailLocalPath
        )

        if (!uploadedThumbnail) {
            throw new ApiError(
                500,
                "Failed to upload thumbnail"
            )
        }

        video.thumbnail = uploadedThumbnail.url
    }

    await video.save({
        validateBeforeSave: false
    })

    const updatedVideo = await Video.findById(video._id).populate(
        "owner",
        "fullName username avatar"
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video updated successfully"
        )
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request")
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    await video.deleteOne()

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video deleted successfully"
        )
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request")
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    video.isPublished = !video.isPublished

    await video.save({
        validateBeforeSave: false
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            video,
            `Video ${
                video.isPublished ? "published" : "unpublished"
            } successfully`
        )
    )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}