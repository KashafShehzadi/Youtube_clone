import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const RegisterUser = asyncHandler(async (req, res) => {
    //1
    const { fullName, email, password, username } = req.body;
    //2
    if (fullName == "") {
        throw new ApiError(400, 'Full name is required')
    }
    if (email == "") {
        throw new ApiError(400, 'email is required')
    }
    if (password == "") {
        throw new ApiError(400, 'password is required')
    }
    if (username == "") {
        throw new ApiError(400, 'Username is required')
    }
    //3
    const existeduser = await User.findOne({
        $or: [{ username, email }]
    })
    if (existeduser) {
        throw new ApiError(409, "User/Email already exist")
    }
    //4
    const avatarExist = req.files()?.avatar[0]?.path
    let coverImageExist;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageExist = req.files.coverImage[0].path
    }
    //5
    if (!avatarExist) {
        throw new ApiError(400, "Avatar required")
    }
    const avatarUpload = await uploadOnCloudinary(avatarExist)
    const coverImage = await uploadOnCloudinary(coverImageExist)


    if (!avatarUpload) {
        throw new ApiError(400, "Avaiter must be uplaod well")
    }

    //6
    const user = await User.create({
        fullName,
        password,
        email,
        avatar: avatarUpload.url,
        coverImage: coverImageExist?.url || "",
        username: username.toLowerCase()
    })
    //7+8---check weather user created in the db or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //error if not found
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    //9
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})

export { RegisterUser }

//-------------------Steps-----------------------------
//1.get user details frm front end
//2validation of these details {notempty}
//3check user already exist{by username/email both are unique}
//4check for avatar ,images
//5upload them to cordinary,get the responce.url
//6create userObject-create entery in db
//7remove passord and refresh and token field refresg
//8check for user creation
//9return response

