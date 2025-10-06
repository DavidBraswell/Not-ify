
import { User } from "../models/user.model.js";


export const authCallBack = async (req, res, next) => {
    try {
        const {id, firstName, lastName, imageURL} = req.body;

        const user = await User.findOne({ clerkID: id}) // checks to see if user is new or existing

        if(!user) { // new user, handles sign up and database entry
            await User.create({
                clerkID: id,
                fullName: `${firstName} ${lastName}`,
                imageURL,
            })
        }
        res.status(200).json({success:true})
    } catch (error) {
        console.log("Error in auth", error);
        next(error);
    }

}