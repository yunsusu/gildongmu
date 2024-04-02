import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

interface IFormInput {
  search: string;
}
export default function Searchbar() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data =>
    firstLastPage(data.search);
  const router = useRouter();
  const { search } = router.query;

  const firstLastPage = (search: string) => {
    if (router.pathname === "/travel") {
      router.push({
        pathname: router.pathname,
        query: { search: search },
      });
    } else {
      router.push({
        pathname: router.pathname + "/travel",
        query: { search: search },
      });
    }
  };

  const placeholderStyle =
    "placeholder:text-18 placeholder:font-bold placeholder:leading-tight placeholder:tracking-tight placeholder:tablet:text-16";

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("search")}
        className={`bg-bg-01 flex h-60 w-[564px] rounded-[32px] pb-12 pl-24 pr-12 pt-12 text-xl font-bold leading-tight tracking-tight text-text-02 focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-52 tablet:w-[534px] tablet:text-16 mobile:w-312 ${placeholderStyle}`}
        placeholder="가고 싶은 여행지를 검색해 주세요!"
        defaultValue={search}
      />
      <button
        type="submit"
        className="absolute right-20 top-1/2 -translate-y-1/2"
      >
        <Image
          src={"/icons/search.svg"}
          alt="돋보기 아이콘"
          width={24}
          height={24}
        />
      </button>
    </form>
  );
}
