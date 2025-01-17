const users = [];

const addUser = ({ id, name, room }) => {  // ajoute un user
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Un nom et un channel sont requis' };
  if(existingUser) return { error: 'Ce nom est déjà pris' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {  // deconnecte un user
  console.log('id: ' + id);
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);  // renvoi le user dans le channel corespondant 

module.exports = { addUser, removeUser, getUser, getUsersInRoom };