"use client";
import React, { FC } from "react";
import { Select, Input } from "@/components/common";
import { useConversionStore } from "@/store/coversion.store";

type TProps = {
  selectOptions: { label: string; value: string }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ConversionForm: FC<TProps> = ({ selectOptions, onSubmit }) => {
  const {
    baseCrypto,
    targetCrypto,
    amount,
    setBaseCrypto,
    setTargetCrypto,
    setAmount,
    errors,
  } = useConversionStore();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value || 1);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex lg:flex-row gap-6 flex-col">
          <Select
            label="From"
            value={baseCrypto}
            onChange={(option) => setBaseCrypto(option?.value as string)}
            options={selectOptions}
            error={errors?.baseCrypto}
          />
          <Select
            label="To"
            value={targetCrypto}
            onChange={(option) => setTargetCrypto(option?.value as string)}
            options={selectOptions}
            error={errors?.targetCrypto}
          />
        </div>
        <Input
          id="amount"
          label="Amount"
          value={amount}
          onChange={handleChangeInput}
          type="number"
          error={errors?.amount}
        />
        <button
          className="bg-yellow-400 h-12 text-white font-semibold rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export { ConversionForm };
