var socket = io();

var $text = $('[name=message]');
var $locBtn = $('#send-location');
var $msgList = $('#message-list');
var $msgForm = $('#message-form');

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var timestamp = moment(message.createdAt).format('h:mma')
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    timestamp: timestamp,
    text: message.text
  });

  $msgList.append(html);
});

socket.on('newLocationMessage', function(message) {
  var timestamp = moment(message.createdAt).format('h:mma')
  var template = $('#loc-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    timestamp: timestamp,
    url: message.url
  });

  $msgList.append(html);

});

$msgForm.on('submit', function(event) {

  event.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $text.val()
  }, function receipt(data){
    $text.val('');
  });

});

$locBtn.on('click', function() {

  if ('geolocation' in navigator) {

    $locBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      $locBtn.removeAttr('disabled').text('Send location');
    }, function() {
      alert('Unable to fetch location');
      $locBtn.removeAttr('disabled').text('Send location');
    });
  } else {
    alert('Geolocation is not supported in this browser');
  }
});
