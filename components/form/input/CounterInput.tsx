import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CounterInput() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 99) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setCount(0);
    } else {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue <= 99) {
        setCount(newValue);
      } else if (newValue > 99) {
        setCount(99);
      }
    }
  };

  return (
    <div className="flex items-center gap-12">
      <Button
        type="button"
        className="w-44 h-44 rounded-full tablet:w-36 tablet:h-36"
        onClick={handleDecrement}
        disabled={count <= 0}
      >
        -
      </Button>
      <Input
        type="text"
        value={count}
        onChange={handleChange}
        className="w-254 h-52 px-16 text-center rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 tablet:w-228 mobile:w-176"
      />
      <Button
        type="button"
        className="w-44 h-44 rounded-full tablet:w-36 tablet:h-36"
        onClick={handleIncrement}
        disabled={count >= 99}
      >
        +
      </Button>
    </div>
  );
}

export default CounterInput;
