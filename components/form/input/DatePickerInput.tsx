// function DatePickerInput({ control }: any) {
//   const [date, setDate] = React.useState<Date>();

//   return (
//     <Controller
//       control={control}
//       name="Date"
//       render={({ field: { onChange } }) => (
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-[756px] h-52 justify-start px-16 py-12",
//                 !date && "text-muted-foreground",
//               )}
//             >
//               {date ? (
//                 <>
//                   <div className="w-24 h-24 relative mr-8">
//                     <Image
//                       src={"/icons/colorCalendar.png"}
//                       alt="캘린더"
//                       layout="fill"
//                     />
//                   </div>
//                   {format(date, "yyyy년 MM월 dd일")}
//                 </>
//               ) : (
//                 <>
//                   <div className="w-24 h-24 relative mr-8">
//                     <Image
//                       src={"/icons/calendar.png"}
//                       alt="캘린더"
//                       layout="fill"
//                     />
//                   </div>
//                   <span>생년월일 입력</span>
//                 </>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-320 h-[348px] bg-white" align="start">
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={date => {
//                 setDate(date);
//                 onChange(date);
//               }}
//               disabled={(date) =>
//                 date > new Date() || date < new Date("1900-01-01")
//               }
//               className=""
//             />
//           </PopoverContent>
//         </Popover>
//       )}
//     />
//   );
// }

// export default DatePickerInput;
import "react-day-picker/dist/style.css";

import { format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

import { Input } from "@/components/ui/input";

function DatePickerInput() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // 선택된 날짜를 표시하기 위한 문자열
  const formattedDate = selectedDay
    ? format(selectedDay, "yyyy년 MM월 dd일")
    : '';

  // Input 컴포넌트를 클릭했을 때 실행될 함수
  const handleInputClick = () => {
    setIsPickerOpen(!isPickerOpen); // 달력 표시 상태를 토글
  };

  // 날짜를 선택했을 때 실행될 함수
  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    setIsPickerOpen(false); // 달력을 숨김
  };

  return (
    <>
      <div className="relative">
        <Input
          value={formattedDate}
          readOnly
          onClick={handleInputClick}
          placeholder="생년월일 입력"
          className="w-[756px] h-52 bg-bg-02 placeholder:text-text-05 tablet:w-[672px] mobile:w-272 border-0 rounded-12 px-16 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white focus:border focus:border-line-01"
        />
        {isPickerOpen && (
          <div className="absolute top-full z-10 bg-white">
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={handleDaySelect}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DatePickerInput;
