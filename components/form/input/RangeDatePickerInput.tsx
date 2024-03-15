import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RangeDatePickerInput() {
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
          id="date"
          type="text"
          value={inputValue}
          readOnly
          placeholder="여행 일정을 선택해 주세요"
          onClick={() => setIsPickerOpen(true)}
          className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border border-line-02 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
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
                className="absolute text-xs w-35 h-25 rounded-15 right-20 -bottom-10"
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
