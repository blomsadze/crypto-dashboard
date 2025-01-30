"use client";
import React, { FC, useMemo } from "react";
import { Chart } from "@/components/common";
import { getChartData } from "@/utils/chart";
import { TimeFrame } from "@/enums/index.enums";
import { IAssetHistory } from "@/interfaces/assets.interface";

type TProps = {
  data: IAssetHistory[];
  timeframe: TimeFrame;
};

const AssetHistoryChart: FC<TProps> = ({ timeframe, data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return [];
    return getChartData(data, timeframe) || [];
  }, [data, timeframe]);

  return <Chart chartData={chartData} />;
};

export { AssetHistoryChart };
