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
  

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are importamnt bhaiyaa...");
  }

  const user = await User.findOne({
    email,
  });
  const passwordValidation = await user.isPasswordCorrect(password);

  if (!passwordValidation) {
    ApiResponse(
      401,
      "Incoreect password bhaiya try again or delete this account we dont have areset password route..."
    );
  }

  const accessToken = await user.generateToken();

  user.logedin = true;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken,
        },
        "User logged In Successfully"
      )
    );

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
