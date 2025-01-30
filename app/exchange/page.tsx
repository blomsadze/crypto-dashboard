import React from "react";
import { Conversion } from "@/components/dashboard";
import { fetchAssets } from "../actions/assets.action";
import { Breadcrumb, PageTitle } from "@/components/common";

const ConversionPage = async () => {
  const assetsData = await fetchAssets();

  return (
    <>
      <PageTitle title="Crypto Convertor" />
      <Breadcrumb />
      <Conversion assetsData={assetsData?.data || []} />
    </>
  );
};

export default ConversionPage;
