// import httpStatus from "http-status";
// import { User } from "../models/user.model.js";
// import bcrypt, { hash } from "bcrypt"

// import crypto from "crypto"
// import { Meeting } from "../models/meeting.model.js";


// const login = async (req, res) => {

//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Please Provide" })
//     }

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
//         }
 

//         let isPasswordCorrect = await bcrypt.compare(password, user.password)

//         if (isPasswordCorrect) {
//             let token = crypto.randomBytes(20).toString("hex");

//             user.token = token;
//             await user.save();
//             return res.status(httpStatus.OK).json({ token: token })
//         } else {
//             return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
//         }

//     } catch (e) {
//         return res.status(500).json({ message: `Something went wrong ${e}` })
//     }
// }

// const register = async (req, res) => {
//     const { name, username, password } = req.body;


//     try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(httpStatus.FOUND).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name: name,
//             username: username,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(httpStatus.CREATED).json({ message: "User Registered" })

//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }

// }


// const getUserHistory = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const user = await User.findOne({ token: token });
//         const meetings = await Meeting.find({ user_id: user.username })
//         res.json(meetings)
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }

// const addToHistory = async (req, res) => {
//     const { token, meeting_code } = req.body;

//     try {
//         const user = await User.findOne({ token: token });

//         const newMeeting = new Meeting({
//             user_id: user.username,
//             meetingCode: meeting_code
//         })

//         await newMeeting.save();

//         res.status(httpStatus.CREATED).json({ message: "Added code to history" })
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }


// export { login, register, getUserHistory, addToHistory }




import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

// User login function
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {  
        return res.status(400).json({ message: "Please Provide" })  // Missing credentials
    }

    try {
        const user = await User.findOne({ username });  // Find user in database
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })  // User not found
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

        await newUser.save();  // Save new user to database

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

        await newMeeting.save();  // Save meeting to database

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })  // Return success response
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })  // Handle error
    }
}

export { login, register, getUserHistory, addToHistory };
