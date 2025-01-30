"use client";
import React from "react";
import dynamic from "next/dynamic";

import { GroupBase, SingleValue, StylesConfig } from "react-select";
import classNames from "classnames";

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
  const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
    control: (provided) => ({
      ...provided,
      borderColor: error ? "red" : provided.borderColor,
      "&:hover": {
        borderColor: error ? "red" : provided.borderColor,
      },
    }),
  };

  return (
    <div className={classNames("w-full", className)}>
      {label && (
        <label
          className={classNames("input-label leading-tight", {
            "text-red-600": error,
          })}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <ReactSelect
        className="react-select-styled react-select-solid"
        styles={customStyles}
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
