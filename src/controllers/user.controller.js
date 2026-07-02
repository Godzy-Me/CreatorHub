import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async ( req,res ) =>{
    res.status(500).json({
        messge: "ok"
    })
})




export {registerUser}