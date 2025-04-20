function MsgCard({ msg, currentUser }) {
    const isSelf = msg.user.toLowerCase() === currentUser.toLowerCase();
  
    return (
      <div className={"msg-card " + (isSelf ? "self" : "")}>
        <span className="vibe-label">{msg.vibe}</span>
        <p className="msg-text">"{msg.text}"</p>
        <span className="msg-user">— {msg.user}</span>
      </div>
    );
  }
  
  export default MsgCard;
  