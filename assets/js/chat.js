$(function(){
      var socket = io();
      $('#send').on('click', function(){
          socket.emit('speech', $('#m').val());
          $('#m').val('');
      });
    socket.on('speech', function(msg){
        var synthes = new SpeechSynthesisUtterance(msg);
        synthes.lang = "ja-JP";
        synthes.volume = 5;
        speechSynthesis.speak( synthes );
    });

});