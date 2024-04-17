interface ChatProps {
  text: string;
}
function ChatDate({ text }: ChatProps) {
  return <div className="text-14 text-text-04">{text}</div>;
}

export default ChatDate;
