import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // recupère les données de l'url
import io from 'socket.io-client';
import './Chat.css';
import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;


   const Chat = ({ location }) => {
    const [name, setName] = useState(''); //on lui passe une chaine vide 
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); // définit l'état des messages
    const [messages, setMessages] = useState([]); // stock les messages dans un array
    const ENDPOINT = 'localhost:7000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)  //recupere les données lors de l'adhesion
       
        socket = io(ENDPOINT); // renvoi les resuetes au serveur  
       
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room}, () => {
        });

        return  () => {
            socket.emit('disconnect')
            socket.off();
        }
     }, [ENDPOINT, location.search]);

        useEffect(() => {
            socket.on('message', (message) => {
                setMessages([...messages, message]);
            })
                  
        }, [messages]);

        const sendMessage = (event) => {
            event.preventDefault();

            if (message) { 
                if (checkCommand(message)) {
                    socket.emit('Command', message, () => setMessage(''));
                } else {
                    socket.emit('sendMessage', message, () => setMessage(''));
                }
            }
        }

        const checkCommand = (message) => {
            const commands = ["/nick", "/list", "/create", "/suppr", "/join", "/part", "/user", "/msg", "/message" ]
            let retour = commands.find(element => element == message)
            if (retour) return true  
            return false
        }
        
       return (
           <div className="outerContainer">
               <div className="container">
                   <InfoBar room={room} />
                   <Messages messages={messages} name={name}/>
                   <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                   </div>
                   <TextContainer users={users} />
           </div>
       )
   }

   export default Chat;