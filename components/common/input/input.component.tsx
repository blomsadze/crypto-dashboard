import React, { ChangeEvent, FC, HTMLProps } from "react";
import classNames from "classnames";

type TInputProps = {
  label?: string;
  name?: string;
  error?: string;
  value?: string | number;
  type?: string;
  containerClassName?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & HTMLProps<HTMLInputElement>;

const Input: FC<TInputProps> = ({
  label = "",
  value,
  type = "text",
  name,
  onChange,
  className,
  containerClassName,
  error,
  ...props
}) => {
  const inputClasses = classNames(
    "w-full",
    "rounded-md",
    "h-[38px]",
    "px-8",
    "border",
    "leading-tight",
    "text-base",
    "font-normal",
    "break-all",
    "focus:outline-none",
    {
      // error
      "border-red-600": !!error,
      // active
      "border-gray-300 active:border-[#cfe0e2]": !error,
      // disabled
      "disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-none":
        !error,
      // success
    },
    className
  );

  return (
    <div className={classNames("relative w-full", containerClassName)}>
      <label
        className={classNames(
          "leading-tight",
          !!error && "text-red-600 !opacity-100"
        )}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={label}
        className={classNames(inputClasses)}
        name={name}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        type={type}
        onChange={onChange}
        value={value || ""}
        {...props}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

export { Input };
