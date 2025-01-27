import { IAssetResponse } from "@/interfaces/assets.interface";
import { apiRequest } from "@/utils/apiRequest.util";
import { useQuery } from "@tanstack/react-query";

export const useAssetsRequest = () => {
  return useQuery<IAssetResponse>({
    queryFn: () => {
      return apiRequest("https://api.coincap.io/v2/assets?limit=10", "get");
    },
    queryKey: ["assets"],
    staleTime: 60000,
    refetchInterval: 60000,
  });
};
