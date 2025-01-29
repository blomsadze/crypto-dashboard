"use server";
import { IAssetResponse } from "@/interfaces/assets.interface";
import { apiRequest } from "@/utils/apiRequest.util";

export async function fetchAssets(): Promise<IAssetResponse | undefined> {
  try {
    const response = await apiRequest(
      "https://api.coincap.io/v2/assets?limit=10",
      "get"
    );

    return response as IAssetResponse;
  } catch (error) {
    console.error("Error fetching assets: ", error);
  }
}
