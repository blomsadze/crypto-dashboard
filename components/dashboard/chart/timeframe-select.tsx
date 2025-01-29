"use client";
import React, { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Select, TOptionType } from "@/components/common";
import { TimeFrame } from "@/enums/index.enums";
import type { SingleValue } from "react-select";

const timeFrameOptions = [
  { label: "Last 24 Hours", value: TimeFrame.H24 },
  { label: "Last 7 Days", value: TimeFrame.D7 },
  { label: "Last 30 Days", value: TimeFrame.D30 },
];

const TimeFrameSelect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTimeFrameChange = (e: SingleValue<TOptionType>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e) {
      params.set("timeframe", e.value.toString());
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="lg:w-1/6 w-full">
      <Select
        label="Select Range"
        value={searchParams.get("timeframe") || TimeFrame.H24}
        onChange={handleTimeFrameChange}
        options={timeFrameOptions}
      />
    </div>
  );
};

export { TimeFrameSelect };
