export function BaseLogo({ size = 24 }: { size?: number }) {
  const iconSize = size / 2;
  return (
    <div
      className="flex items-center justify-center rounded-md bg-gradient-to-br from-[#d4c5b0] to-[#c2b09a]"
      style={{ width: size, height: size }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 12 12" fill="none">
        <rect
          x="1"
          y="1"
          width="10"
          height="10"
          rx="2"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M4 6h4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
