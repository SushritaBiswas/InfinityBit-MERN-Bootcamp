import { useState } from "react";

const vibes = ["Encouraging", "Funny", "Thoughtful", "Loving"];

function MsgForm({ onSend }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [vibe, setVibe] = useState("Encouraging");

  function handleSubmit(e) {
    e.preventDefault();

    const newMsg = {
      id: Date.now(),
      user: name.trim(),
      text: text.trim(),
      vibe: vibe,
    };

    onSend(newMsg);
    setText(""); 
  }

  return (
    <form className="msg-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <select value={vibe} onChange={(e) => setVibe(e.target.value)}>
        {vibes.map((v, i) => (
          <option key={i} value={v}>{v}</option>
        ))}
      </select>
      <button type="submit">Send</button>
    </form>
  );
}

export default MsgForm;
