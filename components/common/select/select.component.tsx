"use client";
import React from "react";
import { SingleValue } from "react-select";
import classNames from "classnames";
import dynamic from "next/dynamic";

const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

export type TOptionType = {
  label: string;
  value: string | number;
};

type TSelectorProps = {
  label?: string;
  error?: string | null;
  disabled?: boolean;
  className?: string;
  value?: string | number;
  placeholder?: string;
  options: TOptionType[];
  onChange: (newValue: SingleValue<TOptionType>) => void;
};

const Select = ({
  label,
  error,
  className,
  disabled = false,
  value,
  placeholder,
  onChange,
  options,
  ...props
}: TSelectorProps) => {
  return (
    <div className={classNames("w-full", className)}>
      {label && (
        <label
          className={classNames(
            "input-label leading-tight",
            error && "text-red-600 !opacity-100"
          )}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <ReactSelect
        className="react-select-styled react-select-solid"
        classNamePrefix="react-select"
        menuPosition="fixed"
        menuPlacement="bottom"
        inputId={label}
        placeholder={placeholder}
        value={options.find((option) => option.value === value) || null}
        onChange={(newValue: unknown) =>
          onChange(newValue as SingleValue<TOptionType>)
        }
        isDisabled={disabled}
        components={{ IndicatorSeparator: null }}
        options={options}
        {...props}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

export { Select };
