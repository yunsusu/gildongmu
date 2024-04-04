import WriteForm from "@/components/form/writeForm";

function Write() {
  return (
    <div className="flex flex-col items-center justify-start bg-bg-04 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        길동무 모집 글쓰기
      </h1>
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center gap-24 px-24 pb-80 mobile:min-w-[312px]">
        <WriteForm />
      </div>
    </div>
  );
}

export default Write;
