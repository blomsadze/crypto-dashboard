import { FC } from "react";
import { AssetsTable } from "@/components/dashboard";
import { PageTitle, Search } from "@/components/common";
import { fetchAssets } from "../actions/assets.action";

type TProps = {
  searchParams: Promise<{ query: string }>;
};

const AssetsPage: FC<TProps> = async ({ searchParams }) => {
  const { query } = await searchParams;
  const assetsData = await fetchAssets();

  const allAssets = assetsData?.data ?? [];

  const assetsList = query
    ? allAssets.filter(({ name, symbol }) => {
        const lowerQuery = query.toLowerCase();
        return (
          name.toLowerCase().includes(lowerQuery) ||
          symbol.toLowerCase().includes(lowerQuery)
        );
      })
    : allAssets;

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Prices" />
        <Search />
      </div>
      <AssetsTable assetsData={assetsList} />
    </>
  );
};

export default AssetsPage;
