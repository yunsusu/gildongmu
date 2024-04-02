import MyPageForm from "@/components/form/mypageForm";

function MyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-bg-06 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        마이 페이지
      </h1>
      <MyPageForm />
    </div>
  );
}

export default MyPage;
