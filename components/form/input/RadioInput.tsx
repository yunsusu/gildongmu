import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RadioInput({
  onChange,
  value,
  pageType,
}: {
  onChange: (value: string) => void;
  value: string;
  pageType: string;
}) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };
  return (
    <RadioGroup
      defaultValue={value}
      className="flex gap-5"
      onValueChange={handleChange}
    >
      {pageType === "write" && (
        <div className="w-121 h-24 flex items-center gap-12 mobile:w-100">
          <RadioGroupItem
            value="none"
            id="none"
            className="w-24 h-24 border-line-01"
          />
          <Label htmlFor="none">상관없음</Label>
        </div>
      )}
      <div className="w-121 h-24 flex items-center gap-12 mobile:w-80">
        <RadioGroupItem
          value="male"
          id="male"
          className="w-24 h-24 border-line-01"
        />
        <Label htmlFor="male">{pageType === "write" ? "남자만" : "남자"}</Label>
      </div>
      <div className="w-121 h-24 flex items-center gap-12 mobile:w-80">
        <RadioGroupItem
          value="female"
          id="female"
          className="w-24 h-24 border-line-01"
        />
        <Label htmlFor="female">
          {pageType === "write" ? "여자만" : "여자"}
        </Label>
      </div>
    </RadioGroup>
  );
}

export default RadioInput;
