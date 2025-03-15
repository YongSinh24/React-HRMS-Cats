import React, {useState } from "react";
import Notification from "../../components/notetification/notetification";
const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <Notification/>
      <h3>Kafka Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>Type:</strong> {msg.type} <br />
            <strong>Content:</strong> {msg.content} <br />
            <strong>Sender:</strong> {msg.sender} <br />
            <strong>Session ID:</strong> {msg.sessionId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
