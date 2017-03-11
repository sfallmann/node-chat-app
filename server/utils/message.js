const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, lat, long) => {
  var url = `https://www.google.com/maps/?q=${lat},${long}`;
  return {
    from,
    url,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};