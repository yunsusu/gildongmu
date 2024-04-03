"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDemo({secretToggle}:any) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox onClick={secretToggle} id="terms" />
      <label
        htmlFor="terms"
        className="text-14 font-normal leading-[18.2px] tracking-[-0.6px] text-text-02 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        비밀 댓글
      </label>
    </div>
  );
}
