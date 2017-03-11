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

socket.on('newLocationMessage', function(message) {
  var newMsg = $('<li />', {
    text: message.from + ': '
  });
  newMsg.append('<a href="' + message.url + '" target="_blank">Location</a>');
  $('#message-list').append(newMsg);
  console.log('newMessage:', message);
});

$('#message-form').on('submit', function(event) {

  event.preventDefault();
  var text = $('[name=message]').val();

  socket.emit('createMessage', {
    from: 'User',
    text: text
  }, function receipt(data){
    console.log('Server receipt: ', data);
  });
});

$('#send-location').on('click', function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function() {
      alert('Unable to fetch location');
    });
  } else {
    alert('Geolocation is not supported in this browser');
  }
});
