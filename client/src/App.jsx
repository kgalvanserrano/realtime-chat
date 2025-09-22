import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // connect to server

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // listen for chat messages from server
    socket.on("chat message", (msg) => {
      console.log("message received:", msg); // log the message
      setMessages((prevMessages) => [...prevMessages, msg]); // add message to state, creates a new array
    });

    // cleanup on unmount
    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <div>
      <h1>Real-time Chat</h1>
      <button onClick={() => socket.emit("chat message", "Hello World!")}>
        Send Message
      </button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;