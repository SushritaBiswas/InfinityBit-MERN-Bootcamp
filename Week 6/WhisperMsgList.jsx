import MsgCard from "./MsgCard";

function MsgList({ Msgs, currentUser }) {
  let content;

  if (Msgs.length === 0) {
    content = <p>No messages yet</p>;
  } else {
    content = Msgs.map(function (m) {
      return <MsgCard key={m.id} msg={m} currentUser={currentUser} />;
    });
  }

  return <div className="msg-list">{content}</div>;
}

export default MsgList;
