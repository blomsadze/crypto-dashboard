"use client";
import React, { useMemo } from "react";
import { Loader, Select, Input } from "@/components/common";

import { useAssetsRequest } from "@/services/useAssetsRequest.service";
import { useConversionStore } from "@/store/coversion.store";
import { useRealTimePrices } from "@/services/useRealTimePrices.service";

const ConversionForm = () => {
  const {
    baseCrypto,
    targetCrypto,
    amount,
    setBaseCrypto,
    setTargetCrypto,
    setAmount,
  } = useConversionStore();

  const { data, isLoading, error } = useAssetsRequest();

  const assets = useMemo(() => data?.data || [], [data]);

  const realTimePrices = useRealTimePrices(
    assets?.map((asset) => asset.id) || []
  );

  const priceMap = useMemo(() => {
    return assets?.reduce((map, asset) => {
      const livePrice = realTimePrices[asset.id];
      map[asset.id] = parseFloat(livePrice) || parseFloat(asset.priceUsd);
      return map;
    }, {} as Record<string, number>);
  }, [assets, realTimePrices]);

  const conversionResult = useMemo(() => {
    if (!priceMap || !baseCrypto || !targetCrypto) return 0;
    const basePrice = priceMap[baseCrypto];
    const targetPrice = priceMap[targetCrypto];
    return (amount * basePrice) / targetPrice;
  }, [priceMap, baseCrypto, targetCrypto, amount]);

  const selectOptions = useMemo(() => {
    return assets?.map((asset) => ({
      value: asset.id,
      label: `${asset.name} (${asset.symbol.toUpperCase()})`,
    }));
  }, [assets]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value || 1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Failed to load market data.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Converter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <Select
          label="From"
          value={baseCrypto}
          onChange={(option) => setBaseCrypto(option?.value as string)}
          options={selectOptions}
        />
        <Select
          label="To"
          value={targetCrypto}
          onChange={(option) => setTargetCrypto(option?.value as string)}
          options={selectOptions}
        />
        <Input
          id="amount"
          label="Amount"
          value={amount}
          onChange={handleChangeInput}
          type="number"
        />
      </div>
      <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow">
        <h2 className="text-lg font-medium text-blue-900">
          {amount} {baseCrypto.toUpperCase()} ≈ {conversionResult.toFixed(3)}{" "}
          {targetCrypto.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export { ConversionForm };
