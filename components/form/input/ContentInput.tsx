import React, { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

function ContentTextarea({
  onChange,
  value,
  isError,
  id,
}: {
  onChange: (value: string) => void;
  value: string;
  isError?: boolean;
  id: string;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex w-[756px] flex-col gap-4 tablet:w-[672px] mobile:w-272">
      <Textarea
        id={id}
        value={text}
        onChange={handleTextChange}
        className={`h-[211px] w-full resize-none rounded-2xl border border-line-02 bg-bg-02 px-16 py-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-[214px] mobile:text-sm ${isError && "border-0 bg-input-error"}`}
        placeholder="모집 내용을 작성해 주세요"
      />
    </div>
  );
}

export default ContentTextarea;
