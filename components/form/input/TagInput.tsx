import Image from "next/image";
import React, { KeyboardEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

function TagInput({ onChange, value, formType }: any) {
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
        id="tags"
        className="w-[756px] h-52 bg-bg-02 mb-5 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
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
            className={`h-34 mobile:h-28 px-13 py-5 bg-primary rounded-24 text-16 mobile:text-14 flex items-center gap-5 ${tagStyles[index]} ${tagTextStyles[index]}`}
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
