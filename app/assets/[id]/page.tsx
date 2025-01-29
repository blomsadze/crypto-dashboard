import { FC } from "react";
import { AssetHistoryChart } from "@/components/dashboard";
import { TimeFrame } from "@/enums/index.enums";

import { getAssetHistory } from "@/app/actions/assets-history.action";
import { TimeFrameSelect } from "@/components/dashboard/chart/timeframe-select";

type TProps = {
  params: Promise<{ assetId: string }>;
  searchParams: Promise<{ timeframe: TimeFrame }>;
};

const CurrentAssetPage: FC<TProps> = async ({ params, searchParams }) => {
  const { assetId } = await params;
  const { timeframe } = await searchParams;

  const assetsHistoryData = await getAssetHistory(
    assetId || "bitcoin",
    timeframe || TimeFrame.H24
  );

  return (
    <div className="flex flex-col gap-4">
      <h2>Crypto History</h2>
      <div className="flex flex-col gap-4 w-full items-center">
        <TimeFrameSelect />
        <AssetHistoryChart
          assetId={assetId}
          timeframe={timeframe}
          data={assetsHistoryData || []}
        />
      </div>
    </div>
  );
};

export default CurrentAssetPage;
