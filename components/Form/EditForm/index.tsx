// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { geocode, RequestType, setKey } from "react-geocode";
import { Controller, useForm } from "react-hook-form";

import ContentTextarea from "@/components/Form/Input/ContentInput";
import CounterInput from "@/components/Form/Input/CounterInput";
import MultipleImageUploadInput from "@/components/Form/Input/MultipleImageUploadInput";
import RadioInput from "@/components/Form/Input/RadioInput";
import RangeDatePickerInput from "@/components/Form/Input/RangeDatePickerInput";
import TagInput from "@/components/Form/Input/TagInput";
import GoogleMap from "@/components/GoogleMap";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDetail } from "@/lib/api/detail";

export interface Location {
  lat: number;
  lng: number;
}

interface Edit {
  title: string;
  destination: string;
  tripDate: {
    startDate: string;
    endDate: string;
  };
  numberOfPeople: number;
  gender: string;
  content: string;
  tag: string[];
  images: any;
}

function EditForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Edit>({
    mode: "onBlur",
  });

  const router = useRouter();
  const { Id: postId } = router.query;
  const { data: writeData } = useQuery({
    queryKey: ["detail", postId],
    queryFn: async () => {
      const res = await getDetail(Number(postId));
      return res;
    },
    enabled: !!postId,
  });

  useEffect(() => {
    if (writeData) {
      reset({
        title: writeData.title,
        destination: writeData.destination,
        tripDate: {
          startDate: writeData.tripDate.startDate,
          endDate: writeData.tripDate.endDate,
        },
        numberOfPeople: writeData.numberOfPeople,
        tag: writeData.tag,
        content: writeData.content,
        gender: writeData.gender,
        images: writeData.images,
      });
    }
  }, [writeData, reset]);
  console.log(writeData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [location, setLocation] = useState<Location>({
    lat: 37.5400456,
    lng: 126.9921017,
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleWritingCancel = () => {
    setIsCancelModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    // API 호출로 데이터 수정
    // try {
    //   const response = await axios.put(`/post/${postid}`, data);
    //   setIsModalOpen(true);
    // } catch (error) {
    //   console.error(error);
    // }
    setIsModalOpen(true);
  };

  const handleSearchLocation = (e: any) => {
    if (e.key === "Enter") {
      setDestination(e.target.value);
    }
  };

  useEffect(() => {
    const trimmedDestination = destination ? destination.trim() : "";

    if (trimmedDestination !== "") {
      setKey(String(apiKey));
      geocode(RequestType.ADDRESS, destination)
        .then(({ results }) => {
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setLocation({
              lat: lat,
              lng: lng,
            });
          }
        })
        .catch(console.error);
    }
  }, [destination, apiKey]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col items-center rounded-32 bg-white px-32 py-48">
          <div className="mx-auto flex w-full max-w-[956px] flex-col gap-32 px-24 tablet:gap-28 mobile:min-w-[272px]">
            <div className="mb-8 flex flex-col items-center">
              <Input
                type="text"
                className={`h-52 w-full rounded-none border-0 border-b px-24 pb-24 pt-12 text-center text-xl font-bold placeholder:text-text-05 focus-visible:ring-0 focus-visible:ring-offset-0`}
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
              <Label htmlFor="destination">
                여행지<span className="text-pink-500">*</span>
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="여행지 입력"
                className="h-52 w-full rounded-12 border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("destination", { required: true })}
                onKeyUp={handleSearchLocation}
              />
              <div className="h-[240px] w-full rounded-12 bg-line-02">
                <GoogleMap location={location} />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="date">
                여행 일정<span className="text-pink-500">*</span>
              </Label>
              <Controller
                control={control}
                name="tripDate"
                rules={{ required: "여행 일정을 선택해 주세요" }}
                render={({ field }) => (
                  <RangeDatePickerInput
                    onChange={dates => field.onChange(dates)}
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
                render={({ field }) => (
                  <CounterInput
                    value={field.value}
                    onChange={value => field.onChange(value)}
                    isError={!!errors.numberOfPeople}
                    id={"member"}
                  />
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
                    onChange={value => field.onChange(value)}
                    value={field.value}
                    pageType="write"
                    id="gender"
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
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <Label htmlFor="tags">태그</Label>
              <Controller
                control={control}
                name="tag"
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
        <div className="mt-40 flex w-full items-center justify-center gap-20 tablet:mt-32">
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
            disabled={!isDirty}
            className="h-52 w-180 tablet:h-44 tablet:w-128"
          >
            수정하기
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          modalType="editingSuccess"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isCancelModalOpen && (
        <Modal
          modalType="writingCancel"
          onCancel={() => {
            setIsCancelModalOpen(false);
          }}
          onConfirm={() => {
            setIsCancelModalOpen(false);
            router.back();
          }}
          onClose={() => {
            setIsCancelModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default EditForm;
