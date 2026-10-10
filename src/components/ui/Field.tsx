import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Label({ className, ...rest }: ComponentProps<"label">) {
  return <label className={cn("block text-body font-semibold text-ink", className)} {...rest} />;
}

/** Error en texto, nunca solo en color. Se enlaza al campo con aria-describedby. */
export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1 text-small font-semibold text-error">
      <span aria-hidden="true">✕</span>
      <span>{children}</span>
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1 text-small text-stone">
      {children}
    </p>
  );
}

export function describedBy(id: string, hint?: ReactNode, error?: ReactNode) {
  const ids = [hint ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

const controlBase =
  "mt-2 block w-full min-h-tap rounded-md border-2 border-line-strong bg-surface px-3 text-body text-ink placeholder:text-stone transition-colors hover:border-ink disabled:cursor-not-allowed disabled:bg-mist disabled:text-stone aria-invalid:border-error";

type CampoComun = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Marca visible de opcional; los obligatorios no llevan marca. */
  optional?: boolean;
};

function Encabezado({ id, label, hint, optional }: Omit<CampoComun, "error">) {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1 font-normal text-stone">(opcional)</span>}
      </Label>
      <FieldHint id={`${id}-ayuda`}>{hint}</FieldHint>
    </>
  );
}

export type InputProps = CampoComun & Omit<ComponentProps<"input">, "id">;

export function Input({ id, label, hint, error, optional, className, ...rest }: InputProps) {
  return (
    <div className={className}>
      <Encabezado id={id} label={label} hint={hint} optional={optional} />
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlBase}
        {...rest}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

export type TextareaProps = CampoComun & Omit<ComponentProps<"textarea">, "id">;

export function Textarea({ id, label, hint, error, optional, className, ...rest }: TextareaProps) {
  return (
    <div className={className}>
      <Encabezado id={id} label={label} hint={hint} optional={optional} />
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, "py-2")}
        {...rest}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

export type SelectProps = CampoComun &
  Omit<ComponentProps<"select">, "id"> & {
    options: readonly { value: string; label: string }[];
    placeholder?: string;
  };

export function Select({
  id,
  label,
  hint,
  error,
  optional,
  className,
  options,
  placeholder = "Selecciona una opción",
  ...rest
}: SelectProps) {
  return (
    <div className={className}>
      <Encabezado id={id} label={label} hint={hint} optional={optional} />
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlBase}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

export type CheckboxProps = Omit<ComponentProps<"input">, "id" | "type"> & {
  id: string;
  children: ReactNode;
  error?: ReactNode;
};

export function Checkbox({ id, children, error, className, ...rest }: CheckboxProps) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 accent-ink disabled:cursor-not-allowed"
          {...rest}
        />
        <label htmlFor={id} className="text-body text-ink">
          {children}
        </label>
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

export type RadioGroupProps = {
  name: string;
  legend: ReactNode;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: ReactNode;
  required?: boolean;
  className?: string;
};

export function RadioGroup({
  name,
  legend,
  options,
  value,
  defaultValue,
  onChange,
  error,
  required,
  className,
}: RadioGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset className={className} aria-describedby={error ? errorId : undefined}>
      <legend className="text-body font-semibold text-ink">{legend}</legend>
      <div className="mt-2 grid gap-1">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-tap cursor-pointer items-center gap-3 has-disabled:cursor-not-allowed has-disabled:text-stone"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              disabled={o.disabled}
              required={required}
              checked={value === undefined ? undefined : value === o.value}
              defaultChecked={defaultValue === undefined ? undefined : defaultValue === o.value}
              onChange={onChange ? () => onChange(o.value) : undefined}
              className="size-5 accent-ink"
            />
            {o.label}
          </label>
        ))}
      </div>
      <FieldError id={errorId}>{error}</FieldError>
    </fieldset>
  );
}
