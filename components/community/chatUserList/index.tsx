import Image from "next/image";

interface itemProp {
  item: {
    id: number;
    isLeader: boolean;
    isAccepted: boolean;
    user: {
      id: number;
      nickname: string;
      isCurrentUser: boolean;
    };
  };
}

function ChatUserList({ item }: itemProp) {
  return (
    <div className="flex items-center gap-12">
      {/* <div className="relative h-32 w-32">
        <Image src={"/images/logo.svg"} alt="프로필" fill />
      </div> */}
      {true && (
        <div className="relative h-20 w-20">
          {item.isLeader && <Image src={"/icons/crown.svg"} alt="왕관" fill />}
        </div>
      )}
      {item.user?.nickname}
    </div>
  );
}

export default ChatUserList;
