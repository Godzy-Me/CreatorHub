import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// healthcheck controller is just to check if the server is running properly and responding to request


const healthCheck = asyncHandler(async (req,res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "OK"
        )
    )
})



export { healthCheck }