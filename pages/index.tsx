import Contents from "@/components/main/contents";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";

export default function Main() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Contents />
        <Footer />
      </div>
    </>
  );
}
