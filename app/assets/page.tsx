import { AssetsTable } from "@/components/dashboard";
import { fetchAssets } from "../actions/assets.action";

const AssetsPage = async () => {
  const assetsData = await fetchAssets();

  return <AssetsTable assetsData={assetsData?.data || []} />;
};

export default AssetsPage;
