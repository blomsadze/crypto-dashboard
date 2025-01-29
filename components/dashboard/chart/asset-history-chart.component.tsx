"use client";
import React, { FC, useMemo } from "react";
import { Chart } from "@/components/common";
import { IAssetHistory } from "@/interfaces/assets.interface";
import { getChartData } from "@/utils/chart";
import { TimeFrame } from "@/enums/index.enums";

type TProps = {
  data: IAssetHistory[];
  assetId: string;
  timeframe: TimeFrame;
};

const AssetHistoryChart: FC<TProps> = ({ timeframe, data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return [];
    return getChartData(data, timeframe) || [];
  }, [data, timeframe]);

  return (
    <div className="lg:w-3/6 xl:w-4/6 xxl:w-5/6 w-full">
      <Chart label="Price (USD)" chartData={chartData} />
    </div>
  );
};

export { AssetHistoryChart };
