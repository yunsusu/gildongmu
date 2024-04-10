import { motion } from "framer-motion";

import CardGrid from "@/components/travel/contents/cardGrid";
import PagingSetting from "@/components/travel/contents/pagingSetting";
function Paging() {
  return (
    <div className="relative border-b border-line-03 bg-white font-bold tracking-tight text-text-01">
      <div className="relative m-auto w-full max-w-[1200px] px-24 pb-80 pt-40 tablet:pb-40 tablet:pt-24 mobile:pb-24">
        <PagingSetting />
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <CardGrid />
        </motion.div>
      </div>
    </div>
  );
}

export default Paging;
