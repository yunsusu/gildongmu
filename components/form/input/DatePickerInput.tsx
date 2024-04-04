import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useOnClickOutside } from "usehooks-ts";

import { Input } from "@/components/ui/input";

function DatePickerInput({
  onChange,
  value,
  id,
}: {
  onChange: (dateString: string) => void;
  value: any;
  id: string;
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const disabledDays = { after: today };

  const formattedDate = value
    ? format(value, "yyyy년 MM월 dd일", { locale: ko })
    : "";

  const handleInputClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleDaySelect = (day: Date | undefined) => {
    if (day) {
      onChange(format(day, "yyyy-MM-dd"));
    } else {
      console.error("날짜 데이터 전송 오류");
    }
    setIsPickerOpen(false);
  };

  useOnClickOutside(ref, () => {
    isPickerOpen && setIsPickerOpen(false);
  });

  const css = `
    .my-selected {
      color: #fff;
      background-color: #14b8a6;
    }
  `;

  return (
    <>
      <div className="relative flex items-center">
        <div className="flex-grow">
          <Input
            id={id}
            value={formattedDate}
            readOnly
            onClick={handleInputClick}
            placeholder="생년월일 입력"
            className="h-52 w-full rounded-2xl border border-line-02 bg-bg-02 px-40 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 mobile:text-sm"
          />
        </div>
        <div className="absolute left-10 top-1/2 h-24 w-24 -translate-y-1/2 transform">
          {value ? (
            <Image src="/icons/colorCalendar.png" alt="색깔달력" fill />
          ) : (
            <Image src="/icons/calendar.svg" alt="달력" fill />
          )}
        </div>
        {isPickerOpen && (
          <div ref={ref} className="absolute top-60 z-10 rounded-2xl bg-white">
            <style>{css}</style>
            <DayPicker
              mode="single"
              defaultMonth={new Date(1990, 0)}
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
              className="rounded-2xl p-10 shadow-md"
              disabled={disabledDays}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DatePickerInput;
