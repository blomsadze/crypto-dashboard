"use client";
import React, { FC, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";

import { Table, Tooltip } from "../../common";
import { useAssets } from "@/hooks/useAssets.hook";
import { useAssetsStore } from "@/store/assets.store";
import { useRealTimePrices } from "@/services/useRealTimePrices.service";
import { IAsset } from "@/interfaces/assets.interface";

type TProps = {
  assetsData: IAsset[];
};

const AssetsTable: FC<TProps> = ({ assetsData }) => {
  const [visibleTooltipRow, setVisibleTooltipRow] = useState<number | null>(
    null
  );

  const { assetsList, assetIds } = useAssetsStore();

  useAssets(assetsData);

  const realTimePrices = useRealTimePrices(assetIds);

  const columns: ColumnDef<IAsset>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (props) => (
          <div className="flex lg:gap-2 lg:flex-row flex-col items-center">
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
        size: 200,
        sortingFn: (rowA, rowB) => {
          const priceA = parseFloat(
            realTimePrices[rowA.original.id] ?? rowA.original.priceUsd
          );
          const priceB = parseFloat(
            realTimePrices[rowB.original.id] ?? rowB.original.priceUsd
          );
          return priceA - priceB;
        },
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
              <span className="text-nowrap">$ {formattedPrice}</span>
            </div>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }) => {
          const rowIndex = row.index;
          return (
            <Tooltip
              text="Details"
              isVisible={visibleTooltipRow === rowIndex}
              onShow={() => setVisibleTooltipRow(rowIndex)}
              onHide={() => setVisibleTooltipRow(null)}
            >
              <Link href={`/assets/${row?.original?.id}?timeframe=24h`}>
                <p className="text-yellow-400 lg:text-xl text-2xl cursor-pointer">
                  <FaChartBar />
                </p>
              </Link>
            </Tooltip>
          );
        },
      },
    ],
    [realTimePrices, visibleTooltipRow]
  );

  return (
    <div className="flex w-full justify-center">
      <Table columns={columns} data={assetsList} />
    </div>
  );
};

export { AssetsTable };
