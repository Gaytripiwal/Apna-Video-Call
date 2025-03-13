import mongoose, { Schema } from "mongoose";

// Define schema for users
const userSchema = new Schema(
    {
        name: { type: String, required: true },  
        username: { type: String, required: true, unique: true },  
        password: { type: String, required: true },  // Encrypted password
        token: { type: String }  // Authentication token
    }
);

// Create User model from schema
const User = mongoose.model("User", userSchema);

export { User };
