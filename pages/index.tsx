import WritingButton from "@/components/Button/Writing";
import Header from "@/components/Header";
import Contents from "@/components/Main/Contents";
import Footer from "@/components/Main/Footer";

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
