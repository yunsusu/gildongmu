import SignUpForm from "@/components/form/signupForm";

function Signup() {
  return (
    <div className="flex flex-col items-center justify-start bg-bg-06 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        회원가입
      </h1>
      <SignUpForm />
    </div>
  );
}

export default Signup;
