// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connect', (socket) => {
//     const users = [];

//     socket.on('login', (data) => {
//         users.push({
//             id: socket.id,
//             room: data.room,
//             username: data.username
//         });

//         socket.join(data.room);
//         socket.in(data.room).emit('notif', `${data.username} memasuki ruangan`);
//         io.in(data.room).emit('login', {id: socket.id, ...data});
//         console.log(users);
//         io.in(data.room).emit('users', users.filter((e) => e.room === data.room))
//     })

//     socket.on('chat', (data) => {
//         console.log(data);
//         const user = users.find((e) => e.id === socket.id);
//         io.in(user.room).emit('chat', {user: user.username, text: data.message});
//         socket.in(user.room).emit('notif', `${user.username} mengirimkan pesan`);
//     })
// })

module.exports = function (server) {
    const io = require("socket.io")(server);
    io.on("connect", (socket) => {
        console.log("a user is connected");
    });
    return io;
}