import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RadioInput({
  onChange,
  value,
  pageType,
  id,
}: {
  onChange: (value: string) => void;
  value: string;
  pageType: string;
  id: string;
}) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };
  return (
    <RadioGroup
      id={id}
      defaultValue={value}
      className="flex gap-5"
      onValueChange={handleChange}
    >
      {pageType === "write" && (
        <div className="flex h-24 w-121 items-center gap-12 mobile:w-100">
          <RadioGroupItem
            value="none"
            id="none"
            className="h-24 w-24 border-line-01 mobile:h-20 mobile:w-20"
          />
          <Label htmlFor="none">상관없음</Label>
        </div>
      )}
      <div className="flex h-24 w-121 items-center gap-12 mobile:w-80">
        <RadioGroupItem
          value="male"
          id="male"
          className="h-24 w-24 border-line-01 mobile:h-20 mobile:w-20"
        />
        <Label htmlFor="male">{pageType === "write" ? "남자만" : "남자"}</Label>
      </div>
      <div className="flex h-24 w-121 items-center gap-12 mobile:w-80">
        <RadioGroupItem
          value="female"
          id="female"
          className="h-24 w-24 border-line-01 mobile:h-20 mobile:w-20"
        />
        <Label htmlFor="female">
          {pageType === "write" ? "여자만" : "여자"}
        </Label>
      </div>
    </RadioGroup>
  );
}

export default RadioInput;
