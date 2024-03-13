import SignUpForm from "@/components/form/signupForm";

function Signup() {
  return (
    <div className="bg-bg-06 flex flex-col justify-start items-center pb-80">
      <h1 className="h-120 text-32 font-extrabold text-text-01 flex items-center tablet:h-100 tablet:text-24">회원가입</h1>
      <SignUpForm />
    </div>
  );
}

export default Signup;
