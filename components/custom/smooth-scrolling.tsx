"use client";
import { ReactLenis } from "lenis/react";

const SmoothScrolling = () => {
  return (
    <ReactLenis
      options={{
        prevent(node) {
          return (
            node.id === "radix-:Ril7:" ||
            node.id === "slider" ||
            node.id === "desktop-menu" ||
            node.id === "mobile-menu" ||
            node.id === "treatment" ||
            node.id === "overlay" ||
            (node.getAttribute("data-state") === "open" &&
              node.classList.contains("fixed"))
          );
        },
      }}
      root
    />
  );
};

export default SmoothScrolling;
