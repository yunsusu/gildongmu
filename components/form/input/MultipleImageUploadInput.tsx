import Image from "next/image";
import { useState } from "react";

interface ImagePreview {
  file: File;
  preview: string;
}

function MultipleImageUploadInput({
  onChange,
}: {
  onChange: (images: ImagePreview[]) => void;
}) {
  const [imagesPreview, setImagesPreview] = useState<ImagePreview[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImagesPreview: ImagePreview[] = files.map(file => ({
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
    onChange(newImages); // 변경된 이미지 배열을 부모 컴포넌트로 전달
  };

  const ImagePreviewComponent = ({
    image,
    index,
  }: {
    image: ImagePreview;
    index: number;
  }) => (
    <div
      key={index}
      className="group relative mr-2 h-132 w-132 tablet:h-118 tablet:w-118"
    >
      <Image
        src={image.preview}
        alt={`preview ${index}`}
        fill
        className="rounded-2xl border border-line-02 object-cover"
      />
      <button
        onClick={() => handleRemoveImage(index)}
        className="absolute right-5 top-5 flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-white"
      >
        x
      </button>
    </div>
  );

  const ImageUploadButton = () => (
    <label
      htmlFor="file"
      className="flex h-132 w-132 cursor-pointer items-center justify-center rounded-2xl border border-line-02 bg-bg-02 tablet:h-118 tablet:w-118"
    >
      <input
        type="file"
        id="file"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
      <Image
        src={"/icons/imagePlus.svg"}
        alt="이미지 추가"
        width={40}
        height={40}
      />
    </label>
  );

  const TitleBage = () => (
    <div className="absolute left-8 top-8 flex h-24 w-42 items-center justify-center rounded-24 bg-tag-orange-100 text-xs text-tag-orange-500 mobile:left-10">
      대표
    </div>
  );

  return (
    <div className="relative">
      <div className="flex w-[756px] gap-24 tablet:w-[672px] tablet:gap-20 mobile:grid mobile:w-272 mobile:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-center">
            {imagesPreview[index] ? (
              <ImagePreviewComponent
                image={imagesPreview[index]}
                index={index}
              />
            ) : (
              <ImageUploadButton />
            )}
          </div>
        ))}
      </div>
      <TitleBage />
    </div>
  );
}

export default MultipleImageUploadInput;
