"use client";
import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

import { Loader, Table } from "../common";
import { useRealTimePrices } from "@/services/useRealTimePrices.service";
import { useAssetsRequest } from "@/services/useAssetsRequest.service";
import { IAsset } from "@/interfaces/market.interface";

const MarketTable = () => {
  const { data, isLoading, error } = useAssetsRequest();

  const assetIds = useMemo(() => {
    return data?.data.map((asset) => asset.id) || [];
  }, [data]);

  const realTimePrices = useRealTimePrices(assetIds);

  const columns: ColumnDef<IAsset>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (props) => (
          <div className="flex gap-2 items-center">
            <span className="text-lg font-bold">
              {props.row.original.symbol}
            </span>
            <span className="text-gray-400 text-sm">
              {props.row.original.name}
            </span>
          </div>
        ),
      },
      {
        header: "Symbol",
        accessorKey: "symbol",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (props) => {
          const price =
            realTimePrices[props.row.original.id] ??
            props.row.original.priceUsd;

          const formattedPrice = parseFloat(price).toFixed(2);
          const isChangePercentPositive =
            parseFloat(props.row.original.changePercent24Hr) > 0;

          return (
            <div className="flex items-center gap-2">
              {isChangePercentPositive ? (
                <IoMdArrowRoundUp className="text-green-500" />
              ) : (
                <IoMdArrowRoundDown className="text-red-500" />
              )}
              <span className="">$ {formattedPrice}</span>
            </div>
          );
        },
      },
    ],
    [realTimePrices]
  );

  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500">Failed to load market data.</div>;
  }

  return <Table columns={columns} data={data?.data || []} />;
};

export default MarketTable;
