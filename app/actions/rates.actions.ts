"use server";
import { apiRequest } from "@/utils/apiRequest.util";
import { IRatesResponse } from "@/interfaces/rates.interface";

export async function fetchRates(): Promise<IRatesResponse | undefined> {
  try {
    const response = await apiRequest("https://api.coincap.io/v2/rates", "get");

    return response as IRatesResponse;
  } catch (error) {
    console.error("Error fetching rates: ", error);
  }
}
