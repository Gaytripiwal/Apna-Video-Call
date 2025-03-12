// import mongoose, { Schema } from "mongoose";

// const meetingSchema = new Schema(
//     {
//         user_id: { type: String },
//         meetingCode: { type: String, required: true },
//         date: { type: Date, default: Date.now, required: true }
//     }
// )

// const Meeting = mongoose.model("Meeting", meetingSchema);

// //default  only one chizz export 
// export { Meeting };

import mongoose, { Schema } from "mongoose";

// Define schema for meetings
const meetingSchema = new Schema(
    {
        user_id: { type: String },  // User ID associated with the meeting
        meetingCode: { type: String, required: true },  // Unique meeting code
        date: { type: Date, default: Date.now, required: true }  // Meeting date with default value
    }
);

// Create Meeting model from schema
const Meeting = mongoose.model("Meeting", meetingSchema);

// Export the Meeting model
export { Meeting };
