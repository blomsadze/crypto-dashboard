"use server";
import { apiRequest } from "@/utils/apiRequest.util";
import { TimeFrame } from "@/enums/index.enums";
import { IAssetHistory } from "@/interfaces/assets.interface";

export const getAssetHistory = async (
  cryptoId: string,
  timeFrame: TimeFrame
) => {
  try {
    const response: { data: IAssetHistory[] } = await apiRequest(
      `https://api.coincap.io/v2/assets/${cryptoId}/history`,
      "get",
      {
        interval: timeFrame === TimeFrame.H24 ? "h1" : "d1",
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
