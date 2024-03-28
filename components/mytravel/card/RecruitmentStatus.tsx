interface RecruitmentStatusProp {
  recruitmentStatus: string;
}

export default function RecruitmentStatus({
  recruitmentStatus,
}: RecruitmentStatusProp) {
  return (
    <>
      {recruitmentStatus === "모집 완료" ? (
        <div className="w-max rounded-24 bg-stone-100 px-12 py-5 text-14 text-stone-500 tablet:px-10 tablet:py-3 tablet:text-12">
          모집 완료
        </div>
      ) : (
        <div className="w-max rounded-24 bg-pink-100 px-12 py-5 text-14 text-pink-500 tablet:px-10 tablet:py-3 tablet:text-12">
          모집 중
        </div>
      )}
    </>
  );
}
