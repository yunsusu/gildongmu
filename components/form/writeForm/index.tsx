import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ContentTextarea from "@/components/form/input/ContentInput";
import CounterInput from "@/components/form/input/CounterInput";
import MultipleImageUploadInput from "@/components/form/input/MultipleImageUploadInput";
import RadioInput from "@/components/form/input/RadioInput";
import RangeDatePickerInput from "@/components/form/input/RangeDatePickerInput";
import TagInput from "@/components/form/input/TagInput";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function WriteForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleWritingCancel = () => {
    setIsCancelModalOpen(true);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // 글쓰기 작성 성공 시
    setIsModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-[956px] flex-col items-center rounded-32 bg-white px-32 py-48 tablet:w-[720px] mobile:w-[312px]">
          <div className="flex flex-col gap-32">
            <div className="mb-8 flex flex-col items-center">
              <Input
                type="text"
                className={`h-52 w-[756px] rounded-0 border-0 border-b px-24 pb-24 pt-12 text-center text-xl font-bold placeholder:text-text-05 focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 ${errors.email && "bg-input-error"}`}
                placeholder="제목을 입력해 주세요"
                {...register("title", { required: true })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="text-12 text-system-error">
                  제목을 입력해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label>
                여행지<span className="text-pink-500">*</span>
              </Label>
              <Input
                placeholder="여행지 입력"
                className="h-52 w-[756px] rounded-12 border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272"
              />
              <div className="h-[240px] w-[756px] bg-line-02 tablet:w-[672px] mobile:w-272">
                지도
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="date">
                여행 일정<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="tripDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <RangeDatePickerInput
                    onChange={(date: any) => field.onChange(date)}
                    value={field.value}
                    id={"date"}
                  />
                )}
              />
              {errors.tripDate && errors.tripDate.type === "required" && (
                <span className="text-12 text-system-error">
                  여행 일정을 선택해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="member">
                모집 인원<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="numberOfPeople"
                rules={{
                  required: "모집 인원을 입력해 주세요",
                  validate: value =>
                    value > 0 || "모집 인원은 최소 1명 이상이어야 합니다",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CounterInput
                      onChange={(member: number) => field.onChange(member)}
                      isError={!!error}
                      id={"member"}
                    />
                    {error && (
                      <span className="text-12 text-system-error">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="gender">
                성별 구성<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="gender"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioInput
                    onChange={(gender: any) => field.onChange(gender)}
                    value={field.value}
                    pageType="write"
                    id={"gender"}
                  />
                )}
              />
              {errors.gender && errors.gender.type === "required" && (
                <span className="text-12 text-system-error">
                  성별 구성을 선택해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="content">
                모집 내용<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="content"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <ContentTextarea
                    onChange={content => field.onChange(content)}
                    value={field.value}
                    isError={!!fieldState.error}
                    id={"content"}
                  />
                )}
              />
              {errors.content && errors.content.type === "required" && (
                <span className="text-12 text-system-error">
                  모집 내용을 작성해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label>이미지</Label>
              <Controller
                control={control}
                name="images"
                render={({ field }) => (
                  <MultipleImageUploadInput
                    onChange={imagesUrl => field.onChange(imagesUrl)}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="tags">태그</Label>
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <TagInput
                    onChange={(tags: any) => field.onChange(tags)}
                    value={field.value}
                    formType={"write"}
                    id={"tags"}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-40 flex w-[956px] items-center justify-center gap-20 tablet:mt-32 tablet:w-[720px] mobile:w-[312px]">
          <Button
            variant={"outline"}
            type="button"
            onClick={handleWritingCancel}
            className="h-52 w-180 tablet:h-44 tablet:w-128"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="h-52 w-180 tablet:h-44 tablet:w-128"
          >
            작성하기
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          modalType="writingSuccess"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isCancelModalOpen && (
        <Modal
          modalType="writingCancel"
          onClose={() => {
            setIsCancelModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default WriteForm;
