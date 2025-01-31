import React from "react";
import { useConversionStore } from "@/store/coversion.store";

const ConversionResult = () => {
  const { conversionResult } = useConversionStore();

  return (
    <div className="p-4 mb-6 bg-[#f2eae1] rounded-lg shadow">
      <h2 className="lg:text-lg font-medium text-blue-900">
        {conversionResult?.amount} {conversionResult?.from?.toUpperCase()} ≈{" "}
        {conversionResult?.total?.toFixed(3)}{" "}
        {conversionResult?.to?.toUpperCase()}
      </h2>
    </div>
  );
};

export { ConversionResult };
