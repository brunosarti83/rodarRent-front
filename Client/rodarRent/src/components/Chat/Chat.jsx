// import React, { useState, useEffect } from 'react';
// import {io} from 'socket.io-client';

// const socket = io('/')

// const Chat = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('chat message', (message) => {
//       setMessages([...messages, message]);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, [messages]);

//   const sendMessage = () => {
//     socket.emit('chat message', message);
//     setMessage('');
//   };

//   return (
//     <div>
// <div className="fixed bottom-4 right-4 bg-slate-500 border border-black-300 rounded-lg p-4 shadow-md">
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Enviar</button>
//     </div>
//   );
// };

// export default Chat;
