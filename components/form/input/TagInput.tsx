import Image from "next/image";
import React, { KeyboardEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

function TagInput({
  onChange,
  value,
  formType,
  id,
}: {
  onChange: (newTags: string[]) => void;
  value: string[] | undefined;
  formType: "write" | "signUp";
  id: string;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!event.nativeEvent.isComposing) {
        const newTag = inputValue.trim();
        if (newTag && !tags.includes(newTag) && tags.length < 3) {
          const newTags = [...tags, newTag];
          onChange(newTags);
          setInputValue("");
        }
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags);
  };

  const tagStyles = ["bg-tag-orange-100", "bg-tag-blue-100", "bg-tag-pink-100"];
  const tagTextStyles = [
    "text-tag-orange-500",
    "text-tag-blue-500",
    "text-tag-pink-500",
  ];

  let placeholderText = "";
  switch (formType) {
    case "write":
      placeholderText =
        tags.length < 3
          ? "#태그를 입력해 주세요"
          : "태그는 최대 3개까지만 가능합니다";
      break;
    case "signUp":
      placeholderText =
        tags.length < 3
          ? "좋아하는 여행지를 입력해 주세요"
          : "태그는 최대 3개까지만 가능합니다";
      break;
    default:
      break;
  }

  return (
    <div>
      <Input
        type="text"
        id={id}
        className="mb-5 h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        maxLength={20}
        placeholder={placeholderText}
      />
      <div className="flex flex-wrap gap-5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`flex h-34 items-center gap-5 rounded-24 bg-primary px-13 py-5 text-16 mobile:h-28 mobile:text-14 ${tagStyles[index]} ${tagTextStyles[index]}`}
          >
            # {tag}
            <button type="button" onClick={() => removeTag(index)}>
              <Image
                src={"/icons/cancel.svg"}
                width={15}
                height={15}
                alt="삭제"
              />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
