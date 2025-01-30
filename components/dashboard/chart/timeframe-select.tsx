"use client";
import React, { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { TimeFrame } from "@/enums/index.enums";

const timeFrameList = [
  { label: "1d", value: TimeFrame.H24 },
  { label: "7d", value: TimeFrame.D7 },
  { label: "30d", value: TimeFrame.D30 },
];

type TProps = {
  selectedTimeframe: TimeFrame;
};

const TimeFrameSelect: FC<TProps> = ({ selectedTimeframe }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTimeFrameChange = (item: TimeFrame) => {
    const params = new URLSearchParams(searchParams.toString());
    if (item) {
      params.set("timeframe", item);
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full mb-4">
      <ul className="flex flex-row gap-4">
        {timeFrameList.map((item) => (
          <li
            key={item.value}
            onClick={() => {
              handleTimeFrameChange(item.value);
            }}
          >
            <span
              className={classNames(
                "uppercase hover:text-yellow-500 font-bold transition-colors lg:text-sm text-xs",
                {
                  "cursor-pointer": true,
                  "text-yellow-400": selectedTimeframe === item.value,
                }
              )}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TimeFrameSelect };
