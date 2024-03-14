import WritingButton from "@/components/button/writing";
import Header from "@/components/header";
import Contents from "@/components/main/contents";
import Footer from "@/components/main/footer";
import ModalButton from "@/components/modal/alert/button";

export default function Main() {
  return (
    <>
      <Header headerColor="bg-primary-press">
        이번 여행, 어디로 떠나볼까요?
      </Header>
      <Contents />
      <ModalButton
        alertType={"writingCancel"}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <WritingButton />
      <Footer />
    </>
  );
}
