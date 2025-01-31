"use client";
import React, { JSX, memo, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import { Input } from "../input";

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
}

const TableComponent = <T,>({
  columns,
  data,
  className,
}: TableProps<T>): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="overflow-x-auto w-full h-full">
      <Input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
        placeholder="Search..."
        className="mb-2 px-3 py-2 border rounded w-full"
      />
      <table className={classNames("w-full h-full", className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={`${header.id}-${header.column.id}`}
                  colSpan={header.colSpan}
                  className="whitespace-nowrap px-[6px] py-[15px] text-left text-sm font-semibold uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex cursor-pointer items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" ? (
                        <FaSortUp className="text-blue-500" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <FaSortDown className="text-blue-500" />
                      ) : (
                        <FaSort className="text-gray-400" />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white mb-[0.62rem] hover:bg-gray-200 even:bg-transparent"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-[6px] py-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table = memo(TableComponent) as typeof TableComponent;

export { Table };
