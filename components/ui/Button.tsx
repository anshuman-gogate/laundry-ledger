"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "px-5 py-2.5 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "text-blue-700 hover:bg-blue-50 disabled:text-blue-300",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
