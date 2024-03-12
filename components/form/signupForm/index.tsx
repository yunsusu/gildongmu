import "react-datepicker/dist/react-datepicker.css";

import { useForm } from "react-hook-form";

import DatePickerInput from "@/components/form/input/DatePickerInput";
import ImageUpload from "@/components/form/input/ImageUploadInput";
import IntroTextarea from "@/components/form/input/IntroTextarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { regEmail, regPassword } from "@/lib/utils/regexp";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onBlur" });

  const password = watch("password", "");

  const onSubmit = (data: any) => {
    console.log(data);
    // 여기서 데이터를 처리하거나 서버로 보낼 수 있습니다.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white w-[956px] px-32 py-48 flex flex-col rounded-32 items-center tablet:w-[720px] mobile:w-[312px]">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-4">
            <Label>
              이메일<span className="text-pink-500">*</span>
            </Label>
            <Input
              type="email"
              className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.email && "bg-input-error"}`}
              placeholder="이메일을 입력해 주세요"
              {...register("email", { required: true, pattern: regEmail })}
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-system-error text-12">
                이메일을 입력해 주세요
              </span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-system-error text-12">
                이메일 형식으로 작성해 주세요
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              닉네임<span className="text-pink-500">*</span>
            </Label>
            <Input
              type="text"
              className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.nickname && "bg-input-error"}`}
              placeholder="닉네임을 입력해 주세요"
              {...register("nickname", {
                required: true,
                minLength: 2,
                maxLength: 8,
              })}
            />
            {errors.nickname && errors.nickname.type === "required" && (
              <span className="text-system-error text-12">
                닉네임을 입력해 주세요
              </span>
            )}
            {errors.nickname && errors.nickname.type === "minLength" && (
              <span className="text-system-error text-12">
                닉네임은 최소 2글자 입니다
              </span>
            )}
            {errors.nickname && errors.nickname.type === "maxLength" && (
              <span className="text-system-error text-12">
                닉네임은 최대 8글자 입니다
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              비밀번호<span className="text-pink-500">*</span>
            </Label>
            <Input
              type="password"
              className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.password && "bg-input-error text-text-02"}`}
              placeholder="비밀번호를 입력해 주세요"
              {...register("password", {
                required: true,
                pattern: regPassword,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-system-error text-12">
                비밀번호를 입력해 주세요
              </span>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <span className="text-system-error text-12">
                영어, 숫자, 특수문자를 조합하여 8자리 이상 입력해 주세요
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              비밀번호 확인<span className="text-pink-500">*</span>
            </Label>
            <Input
              type="password"
              className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.confirmPassword && "bg-input-error"}`}
              placeholder="비밀번호를 다시 입력해 주세요"
              {...register("confirmPassword", {
                required: true,
                validate: value => value === password,
              })}
            />
            {errors.confirmPassword && (
              <span className="text-system-error text-12">
                비밀번호가 일치하지 않습니다
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              성별<span className="text-pink-500">*</span>
            </Label>
            <RadioGroup defaultValue="man" className="flex gap-5">
              <div className="w-121 h-24 flex items-center gap-12">
                <RadioGroupItem
                  value="man"
                  id="man"
                  className="w-24 h-24 border-line-01"
                />
                <Label htmlFor="man">남자</Label>
              </div>
              <div className="w-121 h-24 flex items-center gap-12">
                <RadioGroupItem
                  value="woman"
                  id="woman"
                  className="w-24 h-24 border-line-01"
                />
                <Label htmlFor="woman">여자</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              생년월일<span className="text-pink-500">*</span>
            </Label>
            <DatePickerInput />
          </div>
        </div>
        <div className="my-40">추가 정보 입력</div>
        <div className="flex flex-col gap-24 items-center">
          <ImageUpload />
          <div className="flex flex-col gap-4">
            <Label htmlFor="favorite">좋아하는 여행지</Label>
            <Input
              id="favorite"
              className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
              placeholder="좋아하는 여행지를 입력해 주세요"
            />
          </div>
          <IntroTextarea />
        </div>
      </div>
      <div className="w-[956px] mt-40 flex flex-col rounded-32 items-center tablet:w-[720px] mobile:w-[312px]">
        <button
          type="submit"
          disabled={!isValid}
          className="w-240 h-52 bg-primary text-white rounded-32 flex justify-center items-center disabled:bg-line-02 disabled:text-text-04"
        >
          가입하기
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
