import { Controller, useForm } from "react-hook-form";

import ContentTextarea from "@/components/form/input/ContentInput";
import RadioInput from "@/components/form/input/RadioInput";
import RangeDatePickerInput from "@/components/form/input/RangeDatePickerInput";
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

  return (
    <>
      <form>
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
                className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
              />
              <div className="w-[756px] h-[240px] bg-line-02 tablet:w-[672px] mobile:w-272">
                지도
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="date">
                여행 일정<span className="text-pink-500">*</span>
              </Label>
              <RangeDatePickerInput />
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
            </div>
            <div className="flex flex-col gap-8">
              <Label>
                모집 내용<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <ContentTextarea
                    onChange={text => field.onChange(text)}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div>이미지</div>
            <div>태그</div>
          </div>
        </div>
      </form>
    </>
  );
}

export default WriteForm;
