const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const msg = generateMessage('Sean', 'Something to say');

    expect(msg.from).toBe('Sean');
    expect(msg.text).toBe('Something to say');
    expect(msg.createdAt).toBeA('number');
  })
});