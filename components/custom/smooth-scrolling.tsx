"use client";
import { ReactLenis } from "lenis/react";

const SmoothScrolling = () => {
  return (
    <ReactLenis
      options={{
        prevent(node) {
          return (
            node.id === "radix-:Ril7:" ||
            node.id === "mobile-menu" ||
            node.id === "radix-:R2al7:"
          );
        },
      }}
      root
    />
  );
};

export default SmoothScrolling;
