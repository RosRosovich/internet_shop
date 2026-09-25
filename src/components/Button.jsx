import { forwardRef } from "react";

export const Button = forwardRef(function Button(
  { variant = "default", className = "", ...props },
  ref
) {
  const base =
    variant === "primary" ? "btn-primary"
    : variant === "cancel" ? "btn-cancel"
    : variant === "delete" ? "btn-delete"
    : "";
  return (
    <button ref={ref} className={`${base} ${className}`.trim()} {...props} />
  );
});