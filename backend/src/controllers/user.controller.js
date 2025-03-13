import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

// User login function
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {  
        return res.status(400).json({ message: "Please Provide" })  
    }

    try {
        const user = await User.findOne({ username }); //find user in db
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);  // Compare passwords

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");  // Generate a random token

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })  // Return token on successful login
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })  // Incorrect password
        }

    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` })  // Handle server error
    }
}

// User registration function
const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });  // Check if user already exists
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });  // User exists
        }

        const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before saving

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();  // Save new user to db

        res.status(httpStatus.CREATED).json({ message: "User Registered" })  // Return success response

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })  // Handle server error
    }
}

// Get user meeting history
const getUserHistory = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ token: token });  // Find user by token
        const meetings = await Meeting.find({ user_id: user.username });  // Fetch user meeting history
        res.json(meetings);  // Return meeting history
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })  // Handle error
    }
}

// Add meeting to user history
const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });  // Find user by token

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();  // Save meeting to db

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })  
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })  
    }
}

export { login, register, getUserHistory, addToHistory };
