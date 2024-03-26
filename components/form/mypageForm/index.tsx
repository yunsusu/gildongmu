import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ImageUpload from "@/components/form/input/ImageUploadInput";
import IntroTextarea from "@/components/form/input/IntroTextarea";
import TagInput from "@/components/form/input/TagInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { regEmail, regPassword } from "@/lib/utils/regexp";

interface MyPage {
  bio?: string;
  email: string;
  favoriteSpots?: string[];
  nickname: string;
  password: string;
  profile?: string;
  confirmPassword: string;
  newPassword: string;
}

function MyPageForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<MyPage>({ mode: "onBlur" });

  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const newPassword = watch("newPassword", "");

  const toggleChangePassword = () => {
    setOpenChangePassword(true);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(newPasswordShown => !newPasswordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };

  return (
    <form>
      <div className="flex w-[956px] flex-col items-center gap-24 rounded-32 bg-white px-32 py-48 tablet:w-[720px] mobile:w-[312px]">
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
          <div className="flex justify-between gap-16">
            <div className="relative">
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                className={`h-52 w-[642px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[562px] mobile:w-166 mobile:text-sm ${errors.password && "border-0 bg-input-error text-text-02"}`}
                placeholder="현재 비밀번호를 입력해 주세요"
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
            <Button
              type="button"
              variant={"outline"}
              className="h-52 w-98 rounded-xl text-lg px-16 py-10"
              onClick={toggleChangePassword}
            >
              변경하기
            </Button>
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
        {openChangePassword && (
          <>
            <div className="flex flex-col gap-8">
              <Label htmlFor="newPassword">
                새 비밀번호<span className="text-pink-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={newPasswordShown ? "text" : "password"}
                  className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.newPassword && "border-0 bg-input-error text-text-02"}`}
                  placeholder="비밀번호를 입력해 주세요"
                  {...register("newPassword", {
                    required: true,
                    pattern: regPassword,
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex h-full items-center justify-center px-16">
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisiblity}
                    className="relative h-24 w-24"
                  >
                    <Image
                      src={`/icons/eye-${newPasswordShown ? "on" : "off"}.png`}
                      fill
                      alt="eye-icon"
                    />
                  </button>
                </div>
              </div>
              {errors.newPassword && errors.newPassword.type === "required" && (
                <span className="text-12 text-system-error">
                  비밀번호를 입력해 주세요
                </span>
              )}
              {errors.newPassword && errors.newPassword.type === "pattern" && (
                <span className="text-12 text-system-error">
                  영어, 숫자, 특수문자를 조합하여 8자리 이상 입력해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="confirmPassword">
                새 비밀번호 확인<span className="text-pink-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={confirmPasswordShown ? "text" : "password"}
                  className={`h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm ${errors.confirmPassword && "border-0 bg-input-error"}`}
                  placeholder="비밀번호를 다시 입력해 주세요"
                  {...register("confirmPassword", {
                    required: true,
                    validate: value => value === newPassword,
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
          </>
        )}
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
      </div>
      <div className="mt-40 flex w-[956px] flex-col items-center rounded-32 tablet:w-[720px] mobile:w-[312px]">
          <button
            type="submit"
            disabled={!isValid}
            className="flex h-52 w-240 items-center justify-center rounded-32 bg-primary text-white hover:bg-primary-press disabled:bg-line-02 disabled:text-text-04 mobile:h-44 mobile:w-180"
          >
            저장하기
          </button>
        </div>
    </form>
  );
}

export default MyPageForm;
