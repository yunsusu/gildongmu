import SignUpForm from "@/components/form/signupForm";

function Signup() {
  return (
    <div className="flex flex-col items-center justify-start bg-bg-06 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        회원가입
      </h1>
      <div className="mx-auto flex w-full max-w-[1200px] min-h-screen flex-col items-center gap-24 px-24 pb-80 mobile:min-w-[312px]">
        <SignUpForm />
      </div>
    </div>
  );
}

export default Signup;
