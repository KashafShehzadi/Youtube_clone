import { asyncHandler } from "../utils/asyncHandler.js"
const RegisterUser = asyncHandler(async (req, res) => {
    return res.status(500).json(
        {
            success: true,
            message: 'Registered User Successfully',
        })

})

export  {RegisterUser}