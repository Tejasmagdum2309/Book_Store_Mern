import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "pagal he kay sari fields likha...");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with email exsit bhaya loing karoo bhaiya..."
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(
      500,
      "bhi gaalti ho rahi database me save nahi ho raha tera data..."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate the input fields
  if ([email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "All fields are important, please fill them out.",
    });
  }

  // Find the user in the database
  const user = await User.findOne({ email });
  console.log(user);

  // Handle user not found
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  // Validate the password
  const passwordValidation = await user.isPasswordCorrect(password);
  console.log("Password validation:", passwordValidation);
  if (!passwordValidation) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password, please try again.",
    });
  }

  console.log("Proceeding with login...");

  // Generate access token
  const accessToken = await user.generateToken();

  // Mark user as logged in
  user.logedin = true;
  await user.save();

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Send response with access token
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
      success: true,
      message: "User logged in successfully.",
      data: {
        user: user,
        accessToken,
      },
    });
});


const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        loggedIn: false, // setting the loggedIn field to false
      },
    },
    {
      new: true,//new updated documend we get from this..
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export { registerUser, loginUser, logoutUser };
