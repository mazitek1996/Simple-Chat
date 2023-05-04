import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(
    JSON.parse(localStorage.getItem("message")) || ""
  );

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      localStorage.setItem("message", JSON.stringify(data.message));
    });
  }, [socket]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={handleInputChange}
      />
      <button onClick={sendMessage}>Send message</button>
      <div>{messageReceived}</div>
    </div>
  );
}

export default App;
