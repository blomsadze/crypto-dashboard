"use client";
import React, { FC, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

import { Table } from "../../common";
import { IAsset } from "@/interfaces/assets.interface";
import { useAssetsStore } from "@/store/assets.store";
import { useRealTimePrices } from "@/services/useRealTimePrices.service";
import { useAssets } from "@/hooks/useAssets.hook";

type TProps = {
  assetsData: IAsset[];
};

const AssetsTable: FC<TProps> = ({ assetsData }) => {
  // const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");

  const { assetsList, assetIds } = useAssetsStore();

  useAssets(assetsData);

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
      // {
      //   header: `Change (${timeRange.toUpperCase()})`,
      //   accessorKey: `changePercent${timeRange}`,
      //   cell: (props) => {
      //     // Dynamically use the correct change percent based on the selected range
      //     const changeKey =
      //       timeRange === "24h"
      //         ? "changePercent24Hr"
      //         : timeRange === "7d"
      //         ? "changePercent7D"
      //         : "changePercent30D";

      //     const changePercent = parseFloat(props.row.original[changeKey]);
      //     const isPositive = changePercent > 0;

      //     return (
      //       <div className="flex items-center gap-2">
      //         {isPositive ? (
      //           <IoMdArrowRoundUp className="text-green-500" />
      //         ) : (
      //           <IoMdArrowRoundDown className="text-red-500" />
      //         )}
      //         <span>{changePercent.toFixed(2)}%</span>
      //       </div>
      //     );
      //   },
      // },
    ],
    [realTimePrices]
  );

  return (
    <div className="flex justify-center">
      <Table columns={columns} data={assetsList} />
    </div>
  );
};

export { AssetsTable };
