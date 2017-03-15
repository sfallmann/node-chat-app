class Users {
  constructor() {
    this.users = [];
  }

  addUser (id, name, room){
    const user = {
      id,
      name,
      room
    }
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  removeUser(id) {

    const user = this.getUser(id);
    const index = this.users.indexOf(user);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return user;
  }
  getUserList (room) {
    const users = this.users.filter((user) => {
      return user.room === room;
    });

    return users.map((user) => user.name);
  }
}

const users = new Users();

module.exports = {Users};
