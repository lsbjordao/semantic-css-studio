export function Logo({
  size = 34,
  title = 'Semantic CSS Studio logo',
}: {
  size?: number
  title?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="scs-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a86ff" />
          <stop offset="0.55" stopColor="#6a68f0" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="15"
        fill="url(#scs-logo-g)"
      />
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
      />
      <path
        d="M35 18.5 29 45.5"
        fill="none"
        stroke="#ffd166"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M26.5 22.5 16.5 32l10 9.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.5 22.5 47.5 32l-10 9.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
