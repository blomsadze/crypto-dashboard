/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { IAsset } from "@/interfaces/assets.interface";
import { useAssetsStore } from "@/store/assets.store";

export const useAssets = (initialAssetsData: IAsset[]) => {
  const { setAssetsList, setIsLoading, setAssetIds } = useAssetsStore();

  useEffect(() => {
    const fetchDataAndUpdate = () => {
      setIsLoading(true);
      setAssetsList(initialAssetsData);
      setAssetIds(initialAssetsData.map((asset) => asset.id));
      setIsLoading(false);
    };

    fetchDataAndUpdate();

    const intervalId = setInterval(fetchDataAndUpdate, 60000);
    return () => clearInterval(intervalId);
  }, [initialAssetsData]);
};
