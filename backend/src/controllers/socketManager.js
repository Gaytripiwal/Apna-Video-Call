import { Server } from "socket.io";

let connections = {}; // Store active connections in different calls
let messages = {}; // Store chat messages for each calls
let timeOnline = {}; // Track how long each user stays online

export const connectToSocket = (server) => {
    const io = new Server(server, {
        // cors: {
        //     origin: "*",
        //     methods: ["GET", "POST"],
        //     allowedHeaders: ["*"],
        //     credentials: true
        // }
    });


    // export const connectToSocket = (server) => {
    //     const io = new Server(server, {
    //         cors: {
    //             origin: "https://MeetRTCfrontend-qenw.onrender.com", // Deployed frontend URL
    //             methods: ["GET", "POST"],
    //             credentials: true,
    //         },
    //     });
    

    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = []   // Create a new room if it doesn’t exist
            }
            connections[path].push(socket.id) // Add user to the room

            timeOnline[socket.id] = new Date(); // save time

            // connections[path].forEach(elem => {
            //     io.to(elem)
            // })


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

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                // Send the message to all users in the same room
                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        
                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)
                        connections[key].splice(index, 1) // Remove user from the room

                        if (connections[key].length === 0) { // If the room is empty, delete it
                            delete connections[key]
                        }
                    }
                }

            }


        })

    })

    return io;
}
