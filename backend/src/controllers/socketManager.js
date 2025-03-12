// import { Server } from "socket.io"

// let connections = {}
// let messages = {}
// let timeOnline = {}

// export const connectToSocket = (server) => {
//     const io = new Server(server, {
//         // cors: {
//         //     origin: "*",
//         //     methods: ["GET", "POST"],
//         //     allowedHeaders: ["*"],
//         //     credentials: true
//         // }
//     });


//     io.on("connection", (socket) => {

//         console.log("SOMETHING CONNECTED")

//         socket.on("join-call", (path) => {

//             if (connections[path] === undefined) {
//                 connections[path] = []
//             }
//             connections[path].push(socket.id)

//             timeOnline[socket.id] = new Date();

//             // connections[path].forEach(elem => {
//             //     io.to(elem)
//             // })

//             for (let a = 0; a < connections[path].length; a++) {
//                 io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
//             }

//             if (messages[path] !== undefined) {
//                 for (let a = 0; a < messages[path].length; ++a) {
//                     io.to(socket.id).emit("chat-message", messages[path][a]['data'],
//                         messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
//                 }
//             }

//         })

//         socket.on("signal", (toId, message) => {
//             io.to(toId).emit("signal", socket.id, message);
//         })

//         socket.on("chat-message", (data, sender) => {

//             const [matchingRoom, found] = Object.entries(connections)
//                 .reduce(([room, isFound], [roomKey, roomValue]) => {


//                     if (!isFound && roomValue.includes(socket.id)) {
//                         return [roomKey, true];
//                     }

//                     return [room, isFound];

//                 }, ['', false]);

//             if (found === true) {
//                 if (messages[matchingRoom] === undefined) {
//                     messages[matchingRoom] = []
//                 }

//                 messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
//                 console.log("message", matchingRoom, ":", sender, data)

//                 connections[matchingRoom].forEach((elem) => {
//                     io.to(elem).emit("chat-message", data, sender, socket.id)
//                 })
//             }

//         })

//         socket.on("disconnect", () => {

//             var diffTime = Math.abs(timeOnline[socket.id] - new Date())

//             var key

//             for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

//                 for (let a = 0; a < v.length; ++a) {
//                     if (v[a] === socket.id) {
//                         key = k

//                         for (let a = 0; a < connections[key].length; ++a) {
//                             io.to(connections[key][a]).emit('user-left', socket.id)
//                         }

//                         var index = connections[key].indexOf(socket.id)

//                         connections[key].splice(index, 1)

//                         if (connections[key].length === 0) {
//                             delete connections[key]
//                         }
//                     }
//                 }

//             }


//         })

//     })

//     return io;
// }


import { Server } from "socket.io"

let connections = {}  // Store active connections in different rooms (calls)
let messages = {}     // Store chat messages for each room
let timeOnline = {}   // Track how long each user stays online

export const connectToSocket = (server) => {
    const io = new Server(server);  // Initialize Socket.io with the server

    io.on("connection", (socket) => {  // When a user connects
        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => {  // When a user joins a call (room)

            if (connections[path] === undefined) {  
                connections[path] = []  // Create a new room if it doesn’t exist
            }
            connections[path].push(socket.id)  // Add user to the room

            timeOnline[socket.id] = new Date();  // Save connection time

            // Notify all users in the room about the new user
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            // Send old messages to the new user
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }
        })

        socket.on("signal", (toId, message) => {  // WebRTC signaling for video/audio
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {  // When a user sends a chat message
            // Find which room (call) this user is part of
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found === true) {  // If user is in a valid room
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []  // Create message storage if it doesn’t exist
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })  // Store message
                console.log("message", matchingRoom, ":", sender, data)

                // Send the message to all users in the same room
                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
        })

        socket.on("disconnect", () => {  // When a user disconnects
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())  // Calculate online duration

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {  // Loop through all rooms
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {  // If user found in a room
                        key = k

                        // Notify other users in the room that this user left
                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)
                        connections[key].splice(index, 1)  // Remove user from the room

                        if (connections[key].length === 0) {  // If the room is empty, delete it
                            delete connections[key]
                        }
                    }
                }
            }
        })
    })

    return io;  // Return the initialized socket instance
}

