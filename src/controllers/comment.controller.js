import mongoose from "mongoose" //checking whether an objectID is valid or not
import {comment} from "../models/comment.model.js" //finding comments,creating,updating,deleting comments
import {ApiError} from "../utils/ApiError.js" //custom error class
import {ApiResponse} from "../utils/ApiResponse.js" //sends response in same format everywhere
import {asyncHandler} from "../utils/asyncHandler.js" // wraps every async handler 




// getVideoComments returns all video comments for the user belonging to particular video
const getVideoComments = asyncHandler(async(req,res) => { 
    const {videoId} = req.params   //fetches the video id from the URL

    //check if the fetched is a valid id or not 
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"Invalid video Id")
    }

//pagination sends certain stuff at a time instead of loading the whole thing at a time 
//like for eg: sending only 5 comments in one page (until more scroll)
    
    const page = parseInt(req.query.page) || 1;  //1 incase nothing comes in the url for const page to parse
    const limit = parseInt(req.query.limit) || 10;

    if(page < 1 || limit < 1 ){
        throw new ApiError(400,"Invalid pagination values")
    }
    
    const comments = await Comment.aggregate([  // await cuz it takes time to come
        {                                       // aka -> aggregation pipeline
            $match: {
                video : new mongoose.Types.ObjectId(videoId)   //filters comments belonging to the given video 
                // Equivalent SQL:
                // SELECT * FROM comments WHERE video = videoId;
            }
        },
        {
            $lookup : {        //works like SQL join query 
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project : {           //  instead of returning every field of the user
                            fullName : 1,        // only these are returned 
                            username : 1,         // fullName,username,avatar and not return sensetive 
                            avater : 1             // stuff like password, password refreshToken
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                owner : {
                    $first : "$owner"   //extracts the first object
                }
            }
        },
        {
            $sort : {   //sorts comment by creation time 
                createdAt : -1     // -1 means descending order
            }
        },
        {
            $skip : (skip-1)*limit  //skips previous page
        },
        {
            $limit : Math.min(limit,50) // returns only required number of comments
        }
])


//now if all goes acc to plan then ->

return res.status(200).json(
    new ApiResponse(
        200,
        comments,
        "Comments fetched successfully"
    )
)
})

// adds a new comment to a video
const addComment = asyncHandler(req,res => {
    const {videoId} = req.params
    const {content} = req.body   //gets video id and the comment texts

    if(!req.user?._id){  //check whether the user is logged in
        throw new ApiError(401, "Unauthorized request")
    }

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"Invalid video id")  //check if valid video id or not
    }

    if(!content?.trim()){
        throw new ApiError(400,"Comment content is required") //make sure user doesnt type empty comments
    }                                                         //trim removes empty trails from beginning and end too
                                                                 // "      example     "
    const createdComment = await Comment.findById(comment._id).populate(
        "owner",
        "fullName username avatar"
    ) //creates a new comment i.e fields stored -> content,video,owner

    // if all goes well then ->
    return res.status(201).json(
        new ApiResponse(
            201,
            createdComment,
            "Comment Added Successfully"
        )
    )
})


//allowes only a logged-in user to edit only their own comment
const updateComment = asyncHandler(req,res => {
    const {commentId} = req.params
    const {content} = req.body

    if(!req.user?._id){
        throw new ApiError(401,"Unauthorized request")  //user must be logged in
    }

    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400,"Invalid Comment id")    //check whether comment id is valid
    }

    if(!content?.trim()){
        throw new ApiError(400,"Comment content is required") //prevents empty comment
    }

    const comment = await Comment.findById(commentId)  //search database for commment

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    if(comment.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"Unauthorized Access") //check whether logged-in user owns the comment
    }            //to string cuz mongodb has everything stored that way & then we can compare

    comment.content = content.trim() //update the comment text

    //save comment text
    await comment.save({
        validateBeforeSave: false
    })
    //skip validations cuz only one field has been changed

    const updatedComment = await Comment.findById(comment._id).populate(
        "owner",
        "fullName username avatar"
    ) // returns owner details along with the updated comment

    //if all goes well ->
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedComment,
            "Comment updated successfully"
        )
    )
})

//delete comment (Only owner can do)
const deleteComment = asyncHandler(async(req,res)=> {
    const {commentId} = req.params

    if(!req.user?._id) {
        throw new ApiError(401,"Unauthorized request")
    }
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(401,"Invalid comment id")
    }

    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    if(comment.owner.toString()!==req.user._id.toString()){
        throw new ApiError(403,"Unauthorized request")
    }

    await comment.deleteOne()

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment deleted Successfully"
        )
    )
})


export {
    getVideoComments,
    addComment,
    updatedComment,
    deleteComment
}