export function FieldLabel({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      {value !== undefined ? (
        <span className="text-xs text-slate-500">{value}</span>
      ) : null}
    </div>
  );
}
