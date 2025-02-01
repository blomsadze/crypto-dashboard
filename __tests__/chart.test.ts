import { TimeFrame } from "@/enums/index.enums";
import { IAssetHistory } from "@/interfaces/assets.interface";
import { getChartData } from "@/utils/chart.util";

jest.mock("dayjs", () => {
  const actualDayjs = jest.requireActual("dayjs");
  actualDayjs.extend(jest.requireActual("dayjs/plugin/utc"));
  return (date?: string) => actualDayjs(date || "2025-02-01T12:00:00Z").utc();
});

describe("getChartData", () => {
  const mockData: IAssetHistory[] = [
    { date: "2025-02-01T10:00:00Z", priceUsd: "50000", time: 1738404000000 },
    { date: "2025-01-31T12:00:00Z", priceUsd: "48000", time: 1738324800000 },
    { date: "2025-01-25T12:00:00Z", priceUsd: "47000", time: 1737806400000 },
    { date: "2025-01-01T12:00:00Z", priceUsd: "45000", time: 1735828800000 },
  ];

  it("should filter data for the last 24 hours", () => {
    const result = getChartData(mockData, TimeFrame.H24);
    expect(result).toEqual([{ x: "10:00 AM", y: 50000 }]);
  });

  it("should filter data for the last 7 days", () => {
    const result = getChartData(mockData, TimeFrame.D7);
    expect(result).toEqual([
      { x: "2025-02-01", y: 50000 },
      { x: "2025-01-31", y: 48000 },
    ]);
  });

  it("should filter data for the last 30 days", () => {
    const result = getChartData(mockData, TimeFrame.D30);
    expect(result).toEqual([
      { x: "2025-02-01", y: 50000 },
      { x: "2025-01-31", y: 48000 },
      { x: "2025-01-25", y: 47000 },
    ]);
  });

  it("should return an empty array when no data matches the timeframe", () => {
    const result = getChartData(mockData, TimeFrame.D7);
    expect(result).not.toContain({ x: "2024-12-01", y: 40000 });
  });
});
