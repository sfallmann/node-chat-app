const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '345',
        name: 'Peter',
        room: 'Test'
      }, {
        id: '123',
        name: 'Sean',
        room: 'Different Course'
      }, {
        id: '789',
        name: 'Michelle',
        room: 'Test'
      }
    ];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Sean',
      room: 'Test'
    }
    const testUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    users.removeUser('123');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    users.removeUser('abc');
    expect(users.users.length).toBe(3);
  });

  it('should get a user', () => {
    expect(users.users[0]).toEqual(users.getUser(users.users[0].id));
  });

  it('should not get a user', () => {
    expect(users.getUser('asdafafa')).toNotExist();
  });

  it('should get a list of users in a room', () => {

    const roomList = users.getUserList('Test');
    expect(roomList).toEqual([users.users[0].name, users.users[2].name]);
  });

});
