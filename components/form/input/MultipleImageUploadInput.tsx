import Image from "next/image";
import { useState } from "react";

interface ImagePreview {
  file: File;
  preview: string;
}

function MultipleImageUploadInput({ onChange }: { onChange: (images: ImagePreview[]) => void }) {
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
      onChange(newImages); // 새로운 이미지 배열을 부모 컴포넌트로 전달
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
    <div key={index} className="w-132 h-132 mr-2 relative group tablet:w-118 tablet:h-118">
      <Image
        src={image.preview}
        alt={`preview ${index}`}
        fill
        className="border border-line-02 rounded-2xl object-cover"
      />
      <button
        onClick={() => handleRemoveImage(index)}
        className="w-20 h-20 flex items-center justify-center absolute top-5 right-5 bg-primary text-white rounded-xl"
      >
        x
      </button>
    </div>
  );

  const ImageUploadButton = () => (
    <label htmlFor="file" className="cursor-pointer w-132 bg-bg-02 border border-line-02 rounded-2xl h-132 flex justify-center items-center tablet:w-118 tablet:h-118">
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
    <div className="w-42 h-24 flex items-center justify-center rounded-24 bg-tag-orange-100 text-tag-orange-500 text-xs absolute left-8 top-8 mobile:left-10">
      대표
    </div>
  );

  return (
    <div className="relative">
      <div className="w-[756px] flex gap-24 tablet:w-[672px] tablet:gap-20 mobile:w-272 mobile:grid mobile:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-center items-center">
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
