interface ChatProps {
  text: string;
}
function ChatCome({ text }: ChatProps) {
  return <div className="text-14 text-text-03">{text}</div>;
}

export default ChatCome;
