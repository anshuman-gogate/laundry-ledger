"use client";

import { InputHTMLAttributes } from "react";

type NumericInputProps = {
  value: number;
  onChange: (value: number) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "inputMode"
>;

export function NumericInput({
  value,
  onChange,
  className = "",
  ...rest
}: NumericInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      className={`border rounded px-2 py-1 ${className}`}
      value={value === 0 ? "" : value}
      onChange={(e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        onChange(digitsOnly ? Number(digitsOnly) : 0);
      }}
      {...rest}
    />
  );
}
