import Image from "next/image";
import { useEffect, useState } from "react";

function ImageUpload({
  onChange,
  value,
}: {
  onChange: (file: File | null) => void;
  value: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageSrc(value);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onChange(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange(file); // 여기서 파일 객체를 전달합니다.
  };


  const triggerFileInput = () => document.getElementById("fileInput")?.click();

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <input id="fileInput" type="file" hidden onChange={handleFileChange} />
        <div className="relative mt-4 h-120 w-120 overflow-hidden rounded-full border-4 border-line-02 tablet:h-90 tablet:w-90">
          <Image
            src={imageSrc || "/icons/defaultProfile.png"}
            alt="Profile"
            fill
            priority
            className="rounded-full object-cover"
          />
        </div>
        <button
          type="button"
          className="absolute bottom-0 right-0 h-32 w-32"
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
