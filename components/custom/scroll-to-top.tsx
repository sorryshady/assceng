"use client";
import { useLenis } from "lenis/react";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
const ScrollToTop = () => {
  const lenis = useLenis();
  const scrollToTopHandler = () => {
    function raf(time: number) {
      lenis!.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis!.scrollTo(0, { duration: 1, easing: (t) => t * (2 - t) });
  };
  return (
    <Button
      onClick={scrollToTopHandler}
      size={"icon"}
      className="fixed bottom-10 right-10 rounded-full "
    >
      <ChevronUp size={20} />
    </Button>
  );
};
export default ScrollToTop;
