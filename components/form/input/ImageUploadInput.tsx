import Image from "next/image";
import { useEffect, useState } from "react";

function ImageUpload({
  onChange,
  value,
}: {
  onChange: (value: string | ArrayBuffer | null) => void;
  value: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageSrc(value);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => document.getElementById("fileInput")?.click();

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <input id="fileInput" type="file" hidden onChange={handleFileChange} />
        <div className="w-120 h-120 rounded-full overflow-hidden mt-4 border-4 border-line-02 relative tablet:w-90 tablet:h-90">
          <Image
            src={imageSrc || "/icons/defaultProfile.png"}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <button
          type="button"
          className="w-32 h-32 absolute right-0 bottom-0"
          onClick={triggerFileInput}
        >
          <Image
            src="/icons/upload.png"
            alt="Upload"
            fill
            className="object-cover"
          />
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
