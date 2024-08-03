import User from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Options for cookies
const options = {
  httpOnly: true,
  secure: false,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Function to generate Access token
const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

// 1. Register User
const registerUser = AsyncHandler(async (req, res, next) => {
  /*
        1. Take data of user from frontend
        2. Apply validations
        3. Check user exits with their email only
        4. Create User object into DB
        5. Remove password field from the response
        6. Check user created or not
        7. Return response
    */
  const { firstName, lastName, email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "User with this email already exists"));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registration");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

// 2. Login user
const loginUser = AsyncHandler(async (req, res, next) => {
  /*
    1. Get data from user
    2. Check user exists or not
    3. Compare password matching or not
    4. Generate token by passing user ID
    5. Set data and option to res.cookies
    6. Return reponse to user
  */
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exists"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid Credentials"));
  }

  const accessToken = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully!"
      )
    );
});

// Controllers for authenticated users

// 3. Get profile
const getProfile = AsyncHandler(async (req, res, next) => {
  /*
    1. If user is authenticated req.user contains info it
    2. If user exists return user 
    3. Else return error
  */
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully!")
  );
});

// 4. Update profile
const updateProfile = AsyncHandler(async (req, res, next) => {
  /*
    1. Take new data from user
    2. Check each field must contain valid value
    3. Find Authenticated user in DB 
    4. Update it's details
    5. Return Reponse
  */
 
  const { firstName, lastName, email } = req.body;
  
  if(!firstName || !lastName || !email) {
    throw new ApiError(400, "All fields are required!");
  }
  
  const user = await User.findByIdAndUpdate(
    req.user._id, 
    {
      $set: {
        firstName, lastName, email
      }
    },
    {
      new: true
    }
  ).select("-password");
  
  return res.status(200).json(
    new ApiResponse(200, user, "User profile updated successfully!")
  );
});

// 5. Change password
const changeCurrentPassword = AsyncHandler(async(req, res) => {
  
  /*
    1. Take old and new password from user
    2. Check old one match with password store in DB or not
    3. If yes update user info into DB
    4. Return response
  */
  
  const {oldPassword, newPassword} = req.body

  const user = await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword;
  await user.save({validateBeforeSave: false});

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

// 6. Delete profile
const deleteProfile = AsyncHandler(async (req, res, next) => {
  /*
    1. If user is authenticated delete profile from DB
    2. Else throw error
    3. Return response
  */
 
  const user = await User.findOneAndDelete(req.user._id).select("-password");
  return res.status(200).json(
    new ApiResponse(200, user, "User profile deleted successfully!")
  );
});


export { registerUser, loginUser, getProfile, updateProfile, changeCurrentPassword, deleteProfile };
