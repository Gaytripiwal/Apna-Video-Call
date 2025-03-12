// import mongoose, { Schema } from "mongoose";

// const userScheme = new Schema(
//     {
//         name: { type: String, required: true },
//         username: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         token: { type: String }
//     }
// )

// const User = mongoose.model("User", userScheme);

// export { User };

import mongoose, { Schema } from "mongoose";

// Define schema for users
const userSchema = new Schema(
    {
        name: { type: String, required: true },  // Full name of the user
        username: { type: String, required: true, unique: true },  // Unique username
        password: { type: String, required: true },  // Encrypted password
        token: { type: String }  // Authentication token
    }
);

// Create User model from schema
const User = mongoose.model("User", userSchema);

// Export the User model
export { User };
