import { parseISO } from "date-fns";

interface ChatProps {
  user: {
    id: string;
    content: string;
    createdAt: string;
    type: string;
    sender: {
      id: number;
      nickname: string;
      profilePath: string;
      isCurrentUser: boolean;
    };
  };
}
function MyChat({ user }: ChatProps) {
  const sendDate = parseISO(user.createdAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-full gap-8">
      <div className="flex w-full items-end justify-end gap-8 break-all">
        <div className="text-12 text-text-04">{sendDate}</div>
        <div className="min-h-35 max-w-max flex-1 rounded-6 bg-primary px-8 py-4 text-18 text-white">
          {user.content}
        </div>
      </div>
    </div>
  );
}

export default MyChat;
