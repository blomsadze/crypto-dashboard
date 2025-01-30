"use client";
import React, { FC, useMemo } from "react";

import { ConversionResult, ConversionForm } from ".";
import { useAssets } from "@/hooks/useAssets.hook";
import { useAssetsStore } from "@/store/assets.store";
import { useConversionStore } from "@/store/coversion.store";
import { useRealTimePrices } from "@/services/useRealTimePrices.service";
import { handleConversionSubmit } from "@/utils";
import { IAsset } from "@/interfaces/assets.interface";

type TProps = {
  assetsData: IAsset[];
};

const Conversion: FC<TProps> = ({ assetsData }) => {
  const { assetsList, assetIds } = useAssetsStore();
  const {
    baseCrypto,
    targetCrypto,
    amount,
    conversionResult,
    setConversionResult,
    setErrors,
  } = useConversionStore();

  useAssets(assetsData);

  const realTimePrices = useRealTimePrices(assetIds);

  const priceMap = useMemo(() => {
    if (!assetsList) return {};
    return assetsList.reduce((map, asset) => {
      const livePrice = realTimePrices[asset.id];
      map[asset.id] = parseFloat(livePrice) || parseFloat(asset.priceUsd);
      return map;
    }, {} as Record<string, number>);
  }, [assetsList, realTimePrices]);

  const selectOptions = useMemo(() => {
    return (
      assetsList?.map((asset) => ({
        label: `${asset.name} (${asset.symbol.toUpperCase()})`,
        value: asset.id,
      })) ?? []
    );
  }, [assetsList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleConversionSubmit(
      e,
      amount,
      baseCrypto,
      targetCrypto,
      priceMap,
      setErrors,
      setConversionResult
    );
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="border lg:max-w-[32rem] w-full border-gray-600 rounded-lg shadow p-6">
        {conversionResult?.total ? <ConversionResult /> : null}
        <ConversionForm onSubmit={handleSubmit} selectOptions={selectOptions} />
      </div>
    </div>
  );
};

export { Conversion };
