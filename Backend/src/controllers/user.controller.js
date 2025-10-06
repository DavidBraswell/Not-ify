import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const currUser = req.auth.userId;
        const users = await User.find({ clerkID: { $ne: currUser } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}