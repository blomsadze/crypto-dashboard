"use client";

import React from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  GroupBase,
  SingleValue,
} from "react-select";
import classNames from "classnames";

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
  formatOptionLabel?: ReactSelectProps<
    TOptionType,
    boolean,
    GroupBase<TOptionType>
  >["formatOptionLabel"];
  filterOption?: ReactSelectProps<
    TOptionType,
    boolean,
    GroupBase<TOptionType>
  >["filterOption"];
};

const Select = ({
  label,
  error,
  className,
  disabled = false,
  formatOptionLabel,
  value,
  placeholder,
  filterOption,
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
        onChange={(newValue) => onChange(newValue)}
        formatOptionLabel={formatOptionLabel}
        filterOption={filterOption}
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
