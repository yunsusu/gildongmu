import WriteForm from "@/components/form/writeForm";

function Write() {
  return (
    <div className="bg-bg-04 flex flex-col justify-start items-center pb-80">
      <h1 className="h-120 text-32 font-extrabold text-text-01 flex items-center tablet:h-100 tablet:text-24">
        길동무 모집 글쓰기
      </h1>
      <WriteForm />
    </div>
  );
}

export default Write;
