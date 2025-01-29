import React from "react";
import { ConversionForm } from "@/components/dashboard";
import { fetchAssets } from "../actions/assets.action";

const ConversionPage = async () => {
  const assetsData = await fetchAssets();

  return (
    <div>
      <ConversionForm assetsData={assetsData?.data || []} />
    </div>
  );
};

export default ConversionPage;
