import { User } from "../models/User.js";
import { signToken } from "../utils/auth.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Error getting user:", error);

        res.status(500).json({
            message: "Failed to get user"
        });
    }
};

export const signup = async (req, res) => {
    try {

        const user = await User.create(req.body);

        const token = signToken(user);

        user.password=undefined;

        res.status(201).json({
            token,
            user
        });
    } catch (error) {
        console.error("Error creating user:", error);

        res.status(500).json({
            message: "Error creating user"
        });
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Not a valid user"
            });
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const token = signToken(user);

        user.password = undefined;

        res.status(200).json({
            token,
            user
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};

export const editUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user._id.toString() !== id) {
            return res.status(403).json({
                message: "Not allowed"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error editing user:", error);

        res.status(500).json({
            message: "Failed to edit user"
        });
    }
};