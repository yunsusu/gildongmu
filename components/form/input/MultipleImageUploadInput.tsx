import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagePreview {
  file: File;
  preview: string;
}

function MultipleImageUploadInput({
  onChange,
  value,
}: {
  onChange: (images: ImagePreview[]) => void;
  value: any;
}) {
  const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>(
    value || [],
  );

  useEffect(() => {
    if (value) {
      setImagesPreview(value);
    }
  }, [value]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImagesPreview: any = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const newImages = [...imagesPreview, ...newImagesPreview].slice(0, 5);
      setImagesPreview(newImages);
      onChange(newImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = imagesPreview.filter((_, i) => i !== index);
    setImagesPreview(newImages);
    URL.revokeObjectURL(imagesPreview[index].preview);
    onChange(newImages);
  };

  const ImageUploadButton = () => (
    <label
      htmlFor="file-upload"
      className="flex h-132 w-full max-w-[132px] cursor-pointer items-center justify-center rounded-2xl border border-line-02 bg-bg-02 mobile:min-h-[123px] mobile:max-w-none"
    >
      <Image
        src="/icons/imagePlus.svg"
        alt="Upload images"
        width={50}
        height={50}
      />
      <input
        type="file"
        id="file-upload"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </label>
  );

  const TitleBadge = () => (
    <div className="absolute left-8 top-8 z-10 flex h-24 w-42 items-center justify-center rounded-24 bg-tag-orange-100 text-xs text-tag-orange-500 mobile:left-10">
      대표
    </div>
  );

  return (
    <div className="relative">
      <div
        className="grid justify-between gap-22 tablet:gap-18 mobile:gap-12 "
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))" }}
      >
        {imagesPreview?.map((image: any, index: number) => (
          <div
            key={index}
            className="group relative h-132 w-full max-w-[132px] mobile:min-h-[123px] mobile:max-w-none"
          >
            {index === 0 && <TitleBadge />}
            <Image
              src={
                image.preview
                  ? image.preview
                  : `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${image.url}`
              }
              alt={`Image preview ${index}`}
              layout="fill"
              className="rounded-2xl border border-line-02 object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-white"
            >
              X
            </button>
          </div>
        ))}
        {imagesPreview?.length < 5 && <ImageUploadButton />}
      </div>
    </div>
  );
}

export default MultipleImageUploadInput;
