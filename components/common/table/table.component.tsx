"use client";
import React, { JSX, memo } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full h-full">
      <table className={classNames("w-full", className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="whitespace-nowrap px-[6px] py-[15px] text-left text-sm font-semibold uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-800">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-[6px] py-4 text-sm">
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
