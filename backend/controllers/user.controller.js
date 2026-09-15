import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body || {};

    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already existed with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhoto = "";

    // Upload profile photo if provided
    if (req.file) {
      console.log("Uploading profile photo:", req.file.originalname);

      const uploadPhoto = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "job-portal/profile-photos",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(req.file.buffer);
        });
      };

      const result = await uploadPhoto();

      profilePhoto = result.secure_url;

      console.log("Profile photo uploaded:", profilePhoto);
    }

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profile: {
        profilePhoto,
      },
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //check role...
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with the current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("========== UPDATE PROFILE ==========");
    console.log("USER ID:", req.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Make sure profile exists
    if (!user.profile) {
      user.profile = {};
    }

    // Update basic information
    if (fullname !== undefined) {
      user.fullname = fullname;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (phoneNumber !== undefined) {
      user.phoneNumber = phoneNumber;
    }

    // Update bio
    if (bio !== undefined) {
      user.profile.bio = bio;
    }

    // Update skills
    if (skills !== undefined) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }

    // ==============================
    // RESUME UPLOAD
    // ==============================

    if (req.file) {
      console.log("Uploading resume:", req.file.originalname);

      const uploadResume = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "job-portal/resumes",
              resource_type: "raw",
              public_id: `${userId}_${Date.now()}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(req.file.buffer);
        });
      };

      const result = await uploadResume();

      console.log("Resume uploaded:", result.secure_url);

      // Save Cloudinary URL in MongoDB
      user.profile.resume = result.secure_url;

      // Save original filename if your schema supports it
      user.profile.resumeOriginalName = req.file.originalname;
    }

    // Save user
    await user.save();

    // Return updated user
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
