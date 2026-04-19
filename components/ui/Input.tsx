import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const field =
  "block w-full rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] transition-shadow focus:outline-none focus:shadow-[0_0_0_4px_var(--color-sticker)]";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...rest }, ref) => (
    <input ref={ref} className={`${field} ${className}`} {...rest} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...rest }, ref) => (
  <textarea ref={ref} className={`${field} min-h-[110px] resize-y ${className}`} {...rest} />
));
Textarea.displayName = "Textarea";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  optional?: boolean;
};

export function Label({ children, htmlFor, optional }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center justify-between text-[13px] font-semibold text-[var(--color-ink)]"
    >
      <span>{children}</span>
      {optional && <span className="eyebrow">optional</span>}
    </label>
  );
}
