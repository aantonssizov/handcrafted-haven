const STARS = "★★★★★";

export default function StarRating({
  value,
  count,
  size = "sm",
  showValue = true,
  className = "",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}) {
  const clamped = Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0;
  const percent = (clamped / 5) * 100;
  const starSize = size === "md" ? "text-lg" : "text-sm";
  const labelSize = size === "md" ? "text-sm" : "text-xs";

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`relative inline-block leading-none ${starSize}`}
        role="img"
        aria-label={`${clamped.toFixed(1)} out of 5 stars`}
      >
        {/* Empty stars underneath, filled stars clipped on top */}
        <span className="text-slate-700" aria-hidden="true">
          {STARS}
        </span>
        <span
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-gold-soft"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        >
          {STARS}
        </span>
      </span>

      {showValue ? (
        <span className={`font-semibold text-white ${labelSize}`}>
          {clamped.toFixed(1)}
        </span>
      ) : null}

      {count !== undefined ? (
        <span className={`text-slate-400 ${labelSize}`}>({count})</span>
      ) : null}
    </span>
  );
}
