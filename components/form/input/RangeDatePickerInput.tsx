import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RangeDatePickerInput({
  onChange,
  id,
}: {
  onChange: (range: { startDate: string; endDate: string }) => void;
  id: string;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const today = new Date();

  useEffect(() => {
    if (range?.from && range?.to) {
      const formattedFrom = format(range.from, "yyyy년 MM월 dd일");
      const formattedTo = format(range.to, "yyyy년 MM월 dd일");
      setInputValue(`${formattedFrom} – ${formattedTo}`);
    }
  }, [range]);

  const handleSelectButton = () => {
    if (range?.from && range?.to) {
      const formattedFrom = format(range.from, "yyyy-MM-dd");
      const formattedTo = format(range.to, "yyyy-MM-dd");
      onChange({
        startDate: formattedFrom,
        endDate: formattedTo,
      });
    } else {
      console.error("날짜 데이터 전송 오류");
    }
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
          id={id}
          type="text"
          value={inputValue}
          readOnly
          placeholder="여행 일정을 선택해 주세요"
          onClick={() => setIsPickerOpen(true)}
          className="h-52 w-[756px] rounded-2xl border border-line-02 bg-bg-02 px-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm"
        />
        <style>{css}</style>
        {isPickerOpen && (
          <div className="absolute top-full z-10 bg-white">
            <div className="relative">
              <DayPicker
                mode="range"
                defaultMonth={today}
                selected={range}
                onSelect={setRange}
                fromYear={2024}
                toYear={2035}
                captionLayout="dropdown-buttons"
                showOutsideDays
                fixedWeeks
                locale={ko}
                modifiersClassNames={{
                  selected: "my-selected",
                }}
                className="h-[330px]"
              />
              <Button
                onClick={handleSelectButton}
                className="absolute -bottom-10 right-20 h-25 w-35 rounded-15 text-xs"
              >
                선택
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RangeDatePickerInput;
