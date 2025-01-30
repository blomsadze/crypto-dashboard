import React, { ChangeEvent, FC, HTMLProps } from "react";
import classNames from "classnames";

type TInputProps = {
  id?: string;
  label?: string;
  name?: string;
  error?: string;
  value?: string | number;
  type?: string;
  required?: boolean;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & HTMLProps<HTMLInputElement>;

const Input: FC<TInputProps> = ({
  id,
  label = "",
  value,
  type = "text",
  name,
  onChange,
  maxLength,
  className,
  containerClassName,
  disabled,
  error,
  required,
  ...props
}) => {
  const inputClasses = classNames(
    "w-full",
    "rounded-md",
    "bg-gray-100",
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
        htmlFor={id}
      >
        {label}
      </label>
      <input
        required={required}
        id={id}
        className={classNames(inputClasses)}
        name={name}
        disabled={disabled}
        maxLength={maxLength}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        type={type === "password" ? "password" : type}
        onChange={onChange}
        value={value || ""}
        {...props}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

export { Input };
