import Card from "@/components/card";

export default function Home() {
  return (
    <>
      <div>
        <span className="text-primary text-8 tablet:text-red-600 mobile:text-blue-700">
          안녕하세요
        </span>
        <Card />
      </div>
    </>
  );
}
