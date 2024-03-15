import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CounterInput({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
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

  return (
    <div className="flex items-center gap-12">
      <Button
        type="button"
        variant={"outline"}
        className="w-44 h-44 rounded-ful border-2 tablet:w-36 tablet:h-36"
        onClick={handleDecrement}
        disabled={count <= 0}
      >
        -
      </Button>
      <Input
        type="text"
        value={count}
        onChange={handleChange}
        className="w-254 h-52 px-16 text-center text-l rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-228 mobile:w-176"
      />
      <Button
        type="button"
        variant={"outline"}
        className="w-44 h-44 rounded-full border-2 tablet:w-36 tablet:h-36"
        onClick={handleIncrement}
        disabled={count >= 99}
      >
        +
      </Button>
    </div>
  );
}

export default CounterInput;
