import dayjs from "dayjs";
import { TimeFrame } from "@/enums/index.enums";
import { IAssetHistory } from "@/interfaces/assets.interface";

const filterLast24Hours = (data: IAssetHistory[]): IAssetHistory[] => {
  const now = dayjs();
  const twentyFourHoursAgo = now.subtract(24, "hours");
  return data.filter((item) => dayjs(item.date).isAfter(twentyFourHoursAgo));
};

const filterLastNDays = (
  data: IAssetHistory[],
  days: number
): IAssetHistory[] => {
  const now = dayjs();
  const nDaysAgo = now.subtract(days, "days");
  return data.filter((item) => dayjs(item.date).isAfter(nDaysAgo));
};

const filterByDateRange = (data: IAssetHistory[], timeFrame: TimeFrame) => {
  switch (timeFrame) {
    case TimeFrame.H24:
      return filterLast24Hours(data);
    case TimeFrame.D7:
      return filterLastNDays(data, 7);
    case TimeFrame.D30:
      return filterLastNDays(data, 30);
    default:
      break;
  }
};

export const getChartData = (data: IAssetHistory[], timeFrame: TimeFrame) => {
  const filteredData = filterByDateRange(data, timeFrame);
  const chartData =
    filteredData?.map((item) => ({
      x: dayjs(item.date).format(
        timeFrame === TimeFrame.H24 ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"
      ),
      y: parseFloat(item.priceUsd),
    })) || [];
  return chartData;
};
