import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ImageUpload from "@/components/Form/Input/ImageUploadInput";
import IntroTextarea from "@/components/Form/Input/IntroTextarea";
import TagInput from "@/components/Form/Input/TagInput";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/lib/api/axios";
import { getUserMe } from "@/lib/api/userMe";
import { regPassword } from "@/lib/utils/regexp";

interface MyPage {
  bio?: string;
  email: string;
  favoriteSpots?: string[];
  nickname: string;
  password: string;
  profile?: string;
  confirmPassword: string;
  newPassword: string;
  isPasswordChanged: boolean;
}

function MyPageForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<MyPage>({
    mode: "onBlur",
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [failCheckPassword, setFailCheckPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newPassword = watch("newPassword");
  const currentPassword = watch("password");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(newPasswordShown => !newPasswordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };

  const checkPassword = async () => {
    try {
      const res = await axios.post("/users/me/check-password", {
        password: currentPassword,
      });
      if (res.data.isCorrect) {
        setOpenChangePassword(true);
        setFailCheckPassword(false);
      } else {
        setFailCheckPassword(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/me");
        if (response.data) {
          const imagePath = `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${response.data.profilePath}`;

          reset({
            bio: response.data.bio,
            email: response.data.email,
            favoriteSpots: response.data.favoriteSpots,
            nickname: response.data.nickname,
            profile: imagePath,
          });

          console.log(imagePath);
        }
      } catch (error) {
        console.error("회원정보 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: MyPage) => {
    const formData = new FormData();

    const { confirmPassword, profile, newPassword, ...submitData } = data;

    if (newPassword && newPassword !== currentPassword) {
      submitData.isPasswordChanged = true;
      submitData.password = newPassword;
    } else {
      submitData.isPasswordChanged = false;
      submitData.password = "asdf1234!";
    }

    formData.append(
      "request",
      new Blob([JSON.stringify(submitData)], { type: "application/json" }),
    );

    if (data.profile) {
      formData.append("image", data.profile);
    }

    try {
      const res = await axios.put("/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsModalOpen(true);
      handleUploadPost();
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
    }
  };

  const uploadPostMutation = useMutation({
    mutationFn: () => getUserMe(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUploadPost = () => {
    uploadPostMutation.mutate();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col items-center gap-24 rounded-32 bg-white px-32 py-48">
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
          <div className="flex w-full flex-col gap-8">
            <Label htmlFor="email">
              이메일<span className="text-pink-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              disabled
              className={`h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm`}
              placeholder="이메일을 입력해 주세요"
              {...register("email")}
            />
          </div>
          <div className="flex w-full flex-col gap-8">
            <Label htmlFor="nickname">
              닉네임<span className="text-pink-500">*</span>
            </Label>
            <Input
              id="nickname"
              type="text"
              className={`h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm ${errors.nickname && "border-0 bg-input-error"}`}
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
          <div className="flex w-full flex-col gap-8">
            <Label htmlFor="password">
              비밀번호<span className="text-pink-500">*</span>
            </Label>
            <div className="flex w-full gap-16">
              <div className="relative w-full">
                <Input
                  id="password"
                  type={passwordShown ? "text" : "password"}
                  className={`h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm ${errors.password && "border-0 bg-input-error text-text-02"}`}
                  placeholder="현재 비밀번호를 입력해 주세요"
                  {...register("password", {
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
                variant={!currentPassword ? "ghost" : "outline"}
                className="h-52 w-98 rounded-xl px-16 py-10 text-lg"
                disabled={!currentPassword}
                onClick={checkPassword}
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
              <div className="flex w-full flex-col gap-8">
                <Label htmlFor="newPassword">
                  새 비밀번호<span className="text-pink-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={newPasswordShown ? "text" : "password"}
                    className={`h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm ${errors.newPassword && "border-0 bg-input-error text-text-02"}`}
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
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-12 text-system-error">
                      비밀번호를 입력해 주세요
                    </span>
                  )}
                {errors.newPassword &&
                  errors.newPassword.type === "pattern" && (
                    <span className="text-12 text-system-error">
                      영어, 숫자, 특수문자를 조합하여 8자리 이상 입력해 주세요
                    </span>
                  )}
              </div>
              <div className="flex w-full flex-col gap-8">
                <Label htmlFor="confirmPassword">
                  새 비밀번호 확인<span className="text-pink-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordShown ? "text" : "password"}
                    className={`h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm ${errors.confirmPassword && "border-0 bg-input-error"}`}
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
          <div className="flex w-full flex-col gap-8">
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
          <div className="flex w-full flex-col gap-8">
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
        <div className="mt-40 flex w-full flex-col items-center rounded-32">
          <button
            type="submit"
            disabled={!isValid}
            className="flex h-52 w-240 items-center justify-center rounded-32 bg-primary text-white hover:bg-primary-press disabled:bg-line-02 disabled:text-text-04 mobile:h-44 mobile:w-180"
          >
            저장하기
          </button>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          modalType="changeProfileSuccess"
          onClose={() => {
            setIsModalOpen(false);
            router.push("/");
          }}
        />
      )}
      {failCheckPassword && (
        <Modal
          modalType="failCheckPassword"
          onClose={() => {
            setFailCheckPassword(false);
          }}
        />
      )}
    </>
  );
}

export default MyPageForm;
