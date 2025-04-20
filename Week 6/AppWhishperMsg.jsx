import { useState } from "react";
import MsgForm from "./WhisperMsgForm";
import MsgList from "./WhisperMsgList";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  function handleAddMessage(newMsg) {
    if (!currentUser) {
      setCurrentUser(newMsg.user); 
    }
    setMessages([newMsg, ...messages]);
  }

  return (
    <div className="app">
      <h1>Whisper Network</h1>
      <MsgForm onSend={handleAddMessage} />
      <MsgList Msgs={messages} currentUser={currentUser} />
    </div>
  );
}

export default App;
