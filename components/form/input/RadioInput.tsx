import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RadioInput({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
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
      <div className="w-121 h-24 flex items-center gap-12">
        <RadioGroupItem
          value="man"
          id="man"
          className="w-24 h-24 border-line-01"
        />
        <Label htmlFor="man">남자</Label>
      </div>
      <div className="w-121 h-24 flex items-center gap-12">
        <RadioGroupItem
          value="woman"
          id="woman"
          className="w-24 h-24 border-line-01"
        />
        <Label htmlFor="woman">여자</Label>
      </div>
    </RadioGroup>
  );
}

export default RadioInput;
