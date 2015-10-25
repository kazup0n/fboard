
module.exports = function(http, session){
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
      conosle.log('user connected');

    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
    });

      socket.on("logout", function(userdata) {
          if (socket.handshake.session.userdata) {
              delete socket.handshake.session.userdata;
          }
      });

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      socket.on('speech', function(msg){
        io.emit('speech', msg);
      });
    });

  var sharedsession = require("express-socket.io-session");

    // io.use(sharedsession(session, {
    //   autoSave:true
    // }));
}