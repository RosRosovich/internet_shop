import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

export function ConfirmDialog({
  open,
  title = "Подтвердите действие",
  message,
  confirmText = "OK",
  cancelText = "Отмена",
  onConfirm,
  onCancel,
}) {
  const okRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    okRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="confirm-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <h2 className="confirm-dialog__title">{title}</h2>
        {message && <p className="confirm-dialog__message">{message}</p>}

        <div className="confirm-dialog__actions">
          <Button ref={okRef} variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="cancel" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}