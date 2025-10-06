import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if (req.auth.userID) {
        res.status(401).json({ message: "Not authorized", success: false });
        return;
    }
    next();    
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress

        if (!isAdmin) {
            return res.status(401).json({ message: "Not authorized, admin only", success: false });
        }
        next();
    } catch (error) {
        next(error);
    }
}
