import { AssetsTable } from "@/components/dashboard";
import { PageTitle } from "@/components/common";
import { fetchAssets } from "../actions/assets.action";

const AssetsPage = async () => {
  const assetsData = await fetchAssets();

  return (
    <>
      <PageTitle title="Prices" />
      <AssetsTable assetsData={assetsData?.data || []} />
    </>
  );
};

export default AssetsPage;
