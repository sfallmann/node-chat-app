var socket = io();

var $text = $('[name=message]');
var $locBtn = $('#send-location');
var $msgList = $('#message-list');
var $msgForm = $('#message-form');


function scrollToBtm() {
  var clientHeight = $msgList.prop('clientHeight');
  var scrollTop = $msgList.prop('scrollTop');
  var scrollHeight = $msgList.prop('scrollHeight');
  var $newMsg = $msgList.children('li:last-child');
  var newMsgHeight = $newMsg.innerHeight();
  var lastMsgHeight = $newMsg.prev().innerHeight();

  if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight){
    $msgList.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  const $users = $('<ul></ul>');

  users.forEach(function(user){
    $users.append($('<li></li>').text(user));
  });

  $('#users').html($users);
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
  scrollToBtm();
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
  scrollToBtm();
});

$msgForm.on('submit', function(event) {

  event.preventDefault();

  socket.emit('createMessage', {
    text: $text.val()
  }, function receipt(data) {
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
