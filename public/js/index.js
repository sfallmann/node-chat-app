var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var newMsg = $('<li />', {
    text: message.from + ': ' + message.text
  });

  $('#message-list').append(newMsg);

  console.log('newMessage:', message);
});

$('#message-form').on('submit', function(event) {
  event.preventDefault();

  var text = $('[name=message]').val();
  socket.emit('createMessage', {
    from: 'form user',
    text: text
  }, function receipt(data){
    console.log('Server receipt: ', data);
  });
});
