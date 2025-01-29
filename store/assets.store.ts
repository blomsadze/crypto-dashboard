import { create } from "zustand";
import { IAsset } from "@/interfaces/assets.interface";

interface IAssetStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  assetsList: IAsset[] | [];
  setAssetsList: (assetsList: IAsset[]) => void;
  assetIds: string[] | [];
  setAssetIds: (assetsIds: string[]) => void;
}

export const useAssetsStore = create<IAssetStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  assetsList: [],
  setAssetsList: (assetsList) => set({ assetsList }),
  assetIds: [],
  setAssetIds: (assetIds) => set({ assetIds }),
}));
