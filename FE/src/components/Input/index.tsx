import React, { useMemo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  className?: string;
}

export default function Input({
  id = "",
  type = "",
  placeholder = "",
  label,
  error,
  // errorMessage,
  success,
  register,
  className,
  ...rest
}: InputProps) {
  const colorClass = useMemo(() => {
    switch (true) {
      case success:
        return "text-green-500 ring-green-500 rounded-lg p-4";
      case error:
        return "text-red-500 border-red-500 border-[0.5px] rounded-lg p-4 ";
      default:
        return "border border-[#E1E2E5] rounded-lg p-4";
    }
  }, [success, error]);

  return (
    <div className="flex flex-col gap-3">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={`${colorClass} ${className}`}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
    </div>
  );
}
