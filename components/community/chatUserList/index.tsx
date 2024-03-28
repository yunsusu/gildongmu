import Image from "next/image";

function ChatUserList() {
  return (
    <div className="flex items-center gap-12">
      <div className="relative h-32 w-32">
        <Image src={"/images/logo.svg"} alt="프로필" fill />
      </div>
      {true && (
        <div className="relative h-20 w-20">
          <Image src={"/icons/crown.svg"} alt="왕관" fill />
        </div>
      )}
      작성자 이름
    </div>
  );
}

export default ChatUserList;
