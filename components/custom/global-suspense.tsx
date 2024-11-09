import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const GlobalSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-screen">
          <div className="spinner">
            <Loader2 className="animate-spin" />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default GlobalSuspense;
