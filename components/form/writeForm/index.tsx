import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ContentTextarea from "@/components/form/input/ContentInput";
import CounterInput from "@/components/form/input/CounterInput";
import MultipleImageUploadInput from "@/components/form/input/MultipleImageUploadInput";
import RadioInput from "@/components/form/input/RadioInput";
import RangeDatePickerInput from "@/components/form/input/RangeDatePickerInput";
import TagInput from "@/components/form/input/TagInput";
import AlertModal from "@/components/modal/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function WriteForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
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
        <div className="bg-white w-[956px] px-32 py-48 flex flex-col rounded-32 items-center tablet:w-[720px] mobile:w-[312px]">
          <div className="flex flex-col gap-32">
            <div className="flex flex-col items-center mb-8">
              <Input
                type="text"
                className={`w-[756px] h-52 text-xl text-center font-bold border-0 border-b rounded-0 px-24 pt-12 pb-24 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.email && "bg-input-error"}`}
                placeholder="제목을 입력해 주세요"
                {...register("title", { required: true })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="text-system-error text-12">
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
                className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border border-line-02 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
              />
              <div className="w-[756px] h-[240px] bg-line-02 tablet:w-[672px] mobile:w-272">
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
                  />
                )}
              />
              {errors.tripDate && errors.tripDate.type === "required" && (
                <span className="text-system-error text-12">
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
                name="member"
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
                    />
                    {error && (
                      <span className="text-system-error text-12">
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
                  />
                )}
              />
              {errors.gender && errors.gender.type === "required" && (
                <span className="text-system-error text-12">
                  성별 구성을 선택해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label>
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
                  />
                )}
              />
              {errors.content && errors.content.type === "required" && (
                <span className="text-system-error text-12">
                  모집 내용을 작성해 주세요
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <Label>이미지</Label>
              <Controller
                control={control}
                name="imageUpload"
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
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-[956px] mt-40 flex gap-20 items-center justify-center tablet:w-[720px] tablet:mt-32 mobile:w-[312px]">
          <Button
            variant={"outline"}
            type="button"
            onClick={handleWritingCancel}
            className="w-180 h-52 tablet:w-128 tablet:h-44"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-180 h-52 tablet:w-128 tablet:h-44"
          >
            작성하기
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <AlertModal
          alertType="writingSuccess"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isCancelModalOpen && (
        <AlertModal
          alertType="writingCancel"
          onClose={() => {
            setIsCancelModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default WriteForm;
