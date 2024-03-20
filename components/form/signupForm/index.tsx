import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import DatePickerInput from "@/components/form/input/DatePickerInput";
import ImageUpload from "@/components/form/input/ImageUploadInput";
import IntroTextarea from "@/components/form/input/IntroTextarea";
import RadioInput from "@/components/form/input/RadioInput";
import TagInput from "@/components/form/input/TagInput";
import AlertModal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/lib/api/axios";
import { regEmail, regPassword } from "@/lib/utils/regexp";

interface SignUp {
  bio?: string;
  confirmPassword: string;
  dayOfBirth: string;
  email: string;
  favoriteSpots?: string[];
  gender: "MALE" | "FEMALE";
  nickname: string;
  password: string;
  profile?: string;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUp>({ mode: "onBlur" });

  const router = useRouter();

  const password = watch("password", "");

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckEmailModalOpen, setIsCheckEmailModalOpen] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };

  const checkEmail = async (data: SignUp) => {
    try {
      const emailCheckResponse = await axios.post("/auth/check-email", {
        email: data.email,
      });
      if (emailCheckResponse.data.isUsable) {
        await onSubmit(data);
      } else {
        setIsCheckEmailModalOpen(true);
      }
    } catch (error) {
      console.error("이메일 확인 중 오류 발생:", error);
    }
  };

  const onSubmit = async (data: SignUp) => {
    const formData = new FormData();

    const { confirmPassword, profile, ...submitData } = data;
    formData.append(
      "request",
      new Blob([JSON.stringify(submitData)], { type: "application/json" }),
    );

    if (data.profile) {
      formData.append("profile", data.profile);
    }

    try {
      const res = await axios.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleFormSubmit = (data: SignUp) => {
    checkEmail(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex w-[956px] flex-col items-center rounded-32 bg-white px-32 py-48 tablet:w-[720px] mobile:w-[312px]">
          <div className="mb-40 flex items-center gap-32 tablet:gap-28">
            <div className="h-px w-294 bg-line-02 tablet:w-248 mobile:w-52"></div>
            <div className="text-18 tablet:text-16 mobile:text-14">
              필수 정보 입력
            </div>
            <div className="h-px w-294 bg-line-02 tablet:w-248 mobile:w-52"></div>
          </div>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-8">
              <Label htmlFor="email">
                이메일<span className="text-pink-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.email && "border-0 bg-input-error"}`}
                placeholder="이메일을 입력해 주세요"
                {...register("email", { required: true, pattern: regEmail })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="text-12 text-system-error">
                  이메일을 입력해 주세요
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-12 text-system-error">
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
                className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.nickname && "border-0 bg-input-error"}`}
                placeholder="닉네임을 입력해 주세요"
                {...register("nickname", {
                  required: true,
                  minLength: 2,
                  maxLength: 8,
                })}
              />
              {errors.nickname && errors.nickname.type === "required" && (
                <span className="text-12 text-system-error">
                  닉네임을 입력해 주세요
                </span>
              )}
              {errors.nickname && errors.nickname.type === "minLength" && (
                <span className="text-12 text-system-error">
                  닉네임은 최소 2글자 입니다
                </span>
              )}
              {errors.nickname && errors.nickname.type === "maxLength" && (
                <span className="text-12 text-system-error">
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
                  className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.password && "border-0 bg-input-error text-text-02"}`}
                  placeholder="비밀번호를 입력해 주세요"
                  {...register("password", {
                    required: true,
                    pattern: regPassword,
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex h-full items-center justify-center px-16">
                  <button
                    type="button"
                    onClick={togglePasswordVisiblity}
                    className="relative h-24 w-24"
                  >
                    <Image
                      src={`/icons/eye-${passwordShown ? "on" : "off"}.png`}
                      fill
                      alt="eye-icon"
                    />
                  </button>
                </div>
              </div>
              {errors.password && errors.password.type === "required" && (
                <span className="text-12 text-system-error">
                  비밀번호를 입력해 주세요
                </span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="text-12 text-system-error">
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
                  className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.confirmPassword && "border-0 bg-input-error"}`}
                  placeholder="비밀번호를 다시 입력해 주세요"
                  {...register("confirmPassword", {
                    required: true,
                    validate: value => value === password,
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex h-full items-center justify-center px-16">
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="relative h-24 w-24"
                  >
                    <Image
                      src={`/icons/eye-${confirmPasswordShown ? "on" : "off"}.png`}
                      fill
                      alt="eye-icon"
                    />
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <span className="text-12 text-system-error">
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
                    id={"gender"}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="date">
                생년월일<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="dayOfBirth"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePickerInput
                    onChange={(date: any) => field.onChange(date)}
                    value={field.value}
                    id={"date"}
                  />
                )}
              />
            </div>
          </div>
          <div className="my-40 flex items-center gap-32 tablet:gap-28">
            <div className="h-px w-294 bg-line-02 tablet:w-248 mobile:w-52"></div>
            <div className="text-18 tablet:text-16 mobile:text-14">
              추가 정보 입력
            </div>
            <div className="h-px w-294 bg-line-02 tablet:w-248 mobile:w-52"></div>
          </div>
          <div className="flex flex-col items-center gap-24">
            <Controller
              control={control}
              name="profile"
              render={({ field }) => (
                <ImageUpload
                  onChange={profile => field.onChange(profile)}
                  value={field.value ?? ""}
                />
              )}
            />
            <div className="flex flex-col gap-8">
              <Label htmlFor="tags">좋아하는 여행지</Label>
              <Controller
                control={control}
                name="favoriteSpots"
                render={({ field }) => (
                  <TagInput
                    onChange={(tags: any) => field.onChange(tags)}
                    value={field.value}
                    formType={"signUp"}
                    id={"tags"}
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
                    value={field.value ?? ""}
                    id={"bio"}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-40 flex w-[956px] flex-col items-center rounded-32 tablet:w-[720px] mobile:w-[312px]">
          <button
            type="submit"
            disabled={!isValid}
            className="flex h-52 w-240 items-center justify-center rounded-32 bg-primary text-white hover:bg-primary-press disabled:bg-line-02 disabled:text-text-04 mobile:h-44 mobile:w-180"
          >
            가입하기
          </button>
        </div>
      </form>
      {isModalOpen && (
        <AlertModal
          modalType="signupSuccess"
          onClose={() => {
            setIsModalOpen(false);
            router.push("/login");
          }}
        />
      )}
      {isCheckEmailModalOpen && (
        <AlertModal
          modalType="emailInUse"
          onClose={() => {
            setIsCheckEmailModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default SignUpForm;
