import { AssetsTable } from "@/components/dashboard";
import { PageTitle } from "@/components/common";
import { fetchAssets } from "../actions/assets.action";

const AssetsPage = async () => {
  const assetsData = await fetchAssets();
  const assetsList = assetsData?.data ?? [];

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Prices" />
      </div>
      <AssetsTable assetsData={assetsList} />
    </>
  );
};

export default AssetsPage;
