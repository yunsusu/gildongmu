import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

import { Input } from "@/components/ui/input";

function DatePickerInput({ onChange, value }: any) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const formattedDate = value
    ? format(value, "yyyy년 MM월 dd일", { locale: ko })
    : "";

  const handleInputClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleDaySelect = (day: Date | undefined) => {
    onChange(day);
    setIsPickerOpen(false);
  };

  const css = `
    .my-selected {
      color: #fff;
      background-color: #14b8a6;
    }
  `;

  return (
    <>
      <div className="relative">
        <Input
          value={formattedDate}
          readOnly
          onClick={handleInputClick}
          placeholder="생년월일 입력"
          className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border border-line-02 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
        />
        {isPickerOpen && (
          <div className="absolute top-full z-10 bg-white">
            <style>{css}</style>
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleDaySelect}
              fromYear={1900}
              toYear={2024}
              captionLayout="dropdown-buttons"
              showOutsideDays
              fixedWeeks
              locale={ko}
              modifiersClassNames={{
                selected: "my-selected",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DatePickerInput;
