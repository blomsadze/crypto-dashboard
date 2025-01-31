import { AssetsTable } from "@/components/dashboard";
import { PageTitle } from "@/components/common";
import { fetchAssets } from "../actions/assets.action";
import { fetchRates } from "../actions/rates.actions";

const AssetsPage = async () => {
  const assetsData = await fetchAssets();
  const ratesData = await fetchRates();
  const assetsList = assetsData?.data ?? [];
  const ratesList = ratesData?.data ?? [];

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Prices" />
      </div>
      <AssetsTable assetsData={assetsList} ratesData={ratesList} />
    </>
  );
};

export default AssetsPage;
