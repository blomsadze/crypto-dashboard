export interface IAsset {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

export interface IAssetResponse {
  data: IAsset[];
  timestamp: number;
}

export interface IAssetHistory {
  date: string;
  priceUsd: string;
  time: number;
}

export interface IAssetHistoryResponse {
  data: IAssetHistory[];
  timestamp: number;
}
