import WritingButton from "@/components/button/writing";
import Header from "@/components/header";
import Filter from "@/components/travel/contents/filter";
import Paging from "@/components/travel/contents/paging";

function Travel() {
  return (
    <>
      <Header headerColor={"bg-blue-400"}>
        가고 싶은 여행지 검색하고, 길동무를 찾아보세요!
      </Header>
      <Filter />
      <Paging />

      <WritingButton />
    </>
  );
}

export default Travel;
