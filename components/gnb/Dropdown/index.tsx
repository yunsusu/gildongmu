import Link from "next/link";

function Dropdown() {
  return (
    <div className="text-16 w-119 h-96 bg-white absolute top-76 right-0 flex flex-col justify-center p-16 rounded-16 shadow ">
      <Link
        href={"/mypage"}
        className="w-87 h-29 flex-1 hover:text-teal-500 py-4 px-8 cursor-pointer"
      >
        마이페이지
      </Link>
      <div className="w-87 h-29 flex-1 hover:text-teal-500 py-4 px-8 cursor-pointer">
        로그아웃
      </div>
    </div>
  );
}

export default Dropdown;
