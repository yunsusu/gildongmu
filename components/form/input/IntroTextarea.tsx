import React, { ChangeEvent, useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

function IntroTextarea({
  onChange,
  value,
  id,
}: {
  onChange: (value: string) => void;
  value: string;
  id: string;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 200) {
      setText(inputText);
      onChange(inputText);
    }
  };

  return (
    <div className="flex w-[756px] flex-col gap-4 tablet:w-[672px] mobile:w-272">
      <Textarea
        id={id}
        value={text}
        onChange={handleChange}
        className="h-137 w-full resize-none rounded-12 border border-line-02 bg-bg-02 px-16 py-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-[672px] mobile:w-272 mobile:text-sm"
        placeholder="자기소개를 입력해 주세요"
      />
      <p className="mt-1 self-end text-sm text-gray-500">
        {text?.length ?? 0} / 200
      </p>
    </div>
  );
}

export default IntroTextarea;
