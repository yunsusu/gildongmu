import WritingButton from "@/components/button/writing";
import Header from "@/components/header";
import Contents from "@/components/main/contents";
import Footer from "@/components/main/footer";

export default function Main() {
  return (
    <>
      <Header headerColor="bg-primary-press">
        이번 여행, 어디로 떠나볼까요?
      </Header>
      <Contents />
      <WritingButton />
      <Footer />
    </>
  );
}
