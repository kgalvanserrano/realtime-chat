import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // connect to server

function App() {
  useEffect(() => {
    // listen for chat messages from server
    socket.on("chat message", (msg) => {
      console.log("message received:", msg); // log the message
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
    </div>
  );
}
export default App;