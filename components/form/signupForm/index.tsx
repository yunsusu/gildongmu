import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import DatePickerInput from "@/components/form/input/DatePickerInput";
import ImageUpload from "@/components/form/input/ImageUploadInput";
import IntroTextarea from "@/components/form/input/IntroTextarea";
import RadioInput from "@/components/form/input/RadioInput";
import TagInput from "@/components/form/input/TagInput";
import AlertModal from "@/components/modal/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { regEmail, regPassword } from "@/lib/utils/regexp";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onBlur" });

  const password = watch("password", "");

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // 회원가입 성공 시
    setIsModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-[956px] px-32 py-48 flex flex-col rounded-32 items-center tablet:w-[720px] mobile:w-[312px]">
          <div className="flex flex-col gap-24">
            <div className="flex items-center mb-20">
              <div className="w-294 h-px bg-line-02 tablet:w-248 mobile:w-52"></div>
              <div className="text-18 tablet:text-16 mobile:text-14">
                필수 정보 입력
              </div>
              <div className="w-294 h-px bg-line-02 tablet:w-248 mobile:w-52"></div>
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="email">
                이메일<span className="text-pink-500">*</span>
              </Label>
              <Input
                id="email"
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
            <div className="flex flex-col gap-8">
              <Label htmlFor="nickname">
                닉네임<span className="text-pink-500">*</span>
              </Label>
              <Input
                id="nickname"
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
            <div className="flex flex-col gap-8">
              <Label htmlFor="password">
                비밀번호<span className="text-pink-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordShown ? "text" : "password"}
                  className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.password && "bg-input-error text-text-02"}`}
                  placeholder="비밀번호를 입력해 주세요"
                  {...register("password", {
                    required: true,
                    pattern: regPassword,
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center justify-center px-16 h-full">
                  <button
                    type="button"
                    onClick={togglePasswordVisiblity}
                    className="w-24 h-24 relative"
                  >
                    <Image
                      src={`/icons/eye-${passwordShown ? "off" : "on"}.png`}
                      fill
                      alt="eye-icon"
                    />
                  </button>
                </div>
              </div>
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
            <div className="flex flex-col gap-8">
              <Label htmlFor="confimPassword">
                비밀번호 확인<span className="text-pink-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confimPassword"
                  type={confirmPasswordShown ? "text" : "password"}
                  className={`w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01 ${errors.confirmPassword && "bg-input-error"}`}
                  placeholder="비밀번호를 다시 입력해 주세요"
                  {...register("confirmPassword", {
                    required: true,
                    validate: value => value === password,
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center justify-center px-16 h-full">
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="w-24 h-24 relative"
                  >
                    <Image
                      src={`/icons/eye-${confirmPasswordShown ? "off" : "on"}.png`}
                      fill
                      alt="eye-icon"
                    />
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <span className="text-system-error text-12">
                  비밀번호가 일치하지 않습니다
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="gender">
                성별<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="gender"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioInput
                    onChange={(gender: any) => field.onChange(gender)}
                    value={field.value}
                    pageType="singUp"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="birthDate">
                생년월일<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="birthDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePickerInput
                    onChange={(date: any) => field.onChange(date)}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center my-40 gap-32 tablet:gap-28">
            <div className="w-294 h-px bg-line-02 tablet:w-248 mobile:w-52"></div>
            <div className="text-18 tablet:text-16 mobile:text-14">
              추가 정보 입력
            </div>
            <div className="w-294 h-px bg-line-02 tablet:w-248 mobile:w-52"></div>
          </div>
          <div className="flex flex-col gap-24 items-center">
            <Controller
              control={control}
              name="imageUpload"
              render={({ field }) => (
                <ImageUpload
                  onChange={imageDataUrl => field.onChange(imageDataUrl)}
                  value={field.value}
                />
              )}
            />
            <div className="flex flex-col gap-8">
              <Label htmlFor="tags">좋아하는 여행지</Label>
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <TagInput
                    onChange={(tags: any) => field.onChange(tags)}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="bio">자기소개</Label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <IntroTextarea
                    onChange={text => field.onChange(text)}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-[956px] mt-40 flex flex-col rounded-32 items-center tablet:w-[720px] mobile:w-[312px]">
          <button
            type="submit"
            disabled={!isValid}
            className="w-240 h-52 bg-primary text-white rounded-32 flex justify-center items-center disabled:bg-line-02 disabled:text-text-04 mobile:w-180 mobile:h-44"
          >
            가입하기
          </button>
        </div>
      </form>
      {isModalOpen && (
        <AlertModal
          alertType="signupSuccess"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default SignUpForm;
