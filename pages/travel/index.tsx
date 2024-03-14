import { useEffect } from "react";

import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import Filter from "@/components/travel/contents/filter";
import Paging from "@/components/travel/contents/paging";
import useGnbStore from "@/store/gnb";

function Travel() {
  const { setGnbColor } = useGnbStore();
  useEffect(() => {
    setGnbColor("text-blue-400");
  }, [setGnbColor]);

  return (
    <>
      <Header />
      <Filter />
      <Paging />
      <Footer />
    </>
  );
}

export default Travel;
