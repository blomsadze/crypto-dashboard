import { FC } from "react";

import { Breadcrumb, PageTitle } from "@/components/common";
import { TimeFrameSelect, AssetHistoryChart } from "@/components/dashboard";
import { fetchAssets, getAssetHistory } from "@/app/actions";
import { TimeFrame } from "@/enums/index.enums";

type TProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ timeframe: TimeFrame }>;
};

const CurrentAssetPage: FC<TProps> = async ({ params, searchParams }) => {
  const { id } = await params;
  const { timeframe } = await searchParams;

  const assetsData = await fetchAssets();

  const assetsList = assetsData?.data || [];

  // Check if the asset exists in the list of assets or set the default asset to bitcoin
  const assetId = assetsList?.find((item) => item.id === id)?.id || "bitcoin";

  const currentAsset = assetsList?.find((item) => item.id === assetId);
  const assetTitle = currentAsset
    ? `${currentAsset?.name} Price (${currentAsset?.symbol})`
    : "Asset";

  // Check if the timeframe is valid or set the default timeframe to 24h
  const chartTimeFrame = Object.values(TimeFrame).includes(timeframe)
    ? timeframe
    : TimeFrame.H24;

  const assetsHistoryData = await getAssetHistory(assetId, chartTimeFrame);

  return (
    <div className="flex justify-center gap-4">
      <div className="w-full">
        <Breadcrumb />
        <PageTitle title={assetTitle} />
        <TimeFrameSelect selectedTimeframe={chartTimeFrame} />
        <AssetHistoryChart
          timeframe={chartTimeFrame}
          data={assetsHistoryData || []}
        />
      </div>
    </div>
  );
};

export default CurrentAssetPage;
