import React, { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CounterInput({
  onChange,
  value,
  isError,
  id,
}: {
  onChange: (value: number) => void;
  value: number;
  isError: boolean;
  id: string;
}) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    const newCount = count < 99 ? count + 1 : count;
    setCount(newCount);
    onChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count > 0 ? count - 1 : count;
    setCount(newCount);
    onChange(newCount);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setCount(0);
    } else {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue <= 99) {
        setCount(newValue);
        onChange(newValue);
      } else if (newValue > 99) {
        setCount(99);
      }
    }
  };

  useEffect(() => {
    if (value) {
      setCount(value);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-12">
      <Button
        type="button"
        variant={count <= 0 ? "ghost" : "outline"}
        className="h-44 w-44 rounded-full border-2 tablet:h-36 tablet:w-36"
        onClick={handleDecrement}
      >
        -
      </Button>
      <Input
        id={id}
        type="text"
        value={count}
        onChange={handleChange}
        className={`text-l h-52 w-full max-w-[254px] rounded-xl px-16 text-center focus-visible:ring-0 focus-visible:ring-offset-0  mobile:min-w-156 mobile:text-sm ${isError && "border-0 bg-input-error"}`}
      />
      <Button
        type="button"
        variant={count >= 99 ? "ghost" : "outline"}
        className="h-44 w-44 rounded-full border-2 tablet:h-36 tablet:w-36"
        onClick={handleIncrement}
      >
        +
      </Button>
    </div>
  );
}

export default CounterInput;
