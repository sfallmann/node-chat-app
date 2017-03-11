const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const msg = generateMessage('Sean', 'Something to say');

    expect(msg.from).toBe('Sean');
    expect(msg.text).toBe('Something to say');
    expect(msg.createdAt).toBeA('number');
  });

});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    const msg = generateLocationMessage('Sean', 5, -23);

    expect(msg.from).toBe('Sean');
    expect(msg.url).toBe(`https://www.google.com/maps/?q=5,-23`);
    expect(msg.createdAt).toBeA('number');
  });

});
