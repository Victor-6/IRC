const { quite } = require("./index");
const { removeUser } = require("./Users");

const users = [];

const nick = () => {
    const addUser = ({ id, name, room }) => {  // ajoute un user
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
      
        const existingUser = users.find((user) => user.room === room && user.name === name);
      
        if(!name || !room) return { error: 'Un nom et un channel sont requis' };
        if(existingUser) return { error: 'Ce nom est déjà pris' };
      
        const user = { id, name, room };
      
        users.push(user);
      
        return { user };
      }    }

const list = () => {

}   

const create = () => {
    
} 
const suppr = () => {
    
} 
const join = () => {
    
} 
const part = () => {
    
}

const user = () => {
    
} 

const msg = () => {
    
} 
const message = () => {
    
} 

module.exports = { nick, list, create, suppr, join, part, user, msg, message };
  

