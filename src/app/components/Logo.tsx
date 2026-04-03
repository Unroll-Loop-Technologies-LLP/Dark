export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Loop */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      
      {/* Inner Loop */}
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="url(#gradient2)"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />
      
      {/* Unroll Symbol - Arrow Path */}
      <path
        d="M 35 50 L 55 50 M 50 45 L 55 50 L 50 55"
        stroke="url(#gradient3)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Center Dot */}
      <circle
        cx="30"
        cy="50"
        r="4"
        fill="url(#gradient4)"
      />
      
      {/* Tech Nodes */}
      <circle cx="50" cy="20" r="3" fill="#6C5CE7" opacity="0.8" />
      <circle cx="80" cy="50" r="3" fill="#00D4FF" opacity="0.8" />
      <circle cx="50" cy="80" r="3" fill="#6C5CE7" opacity="0.8" />
      <circle cx="20" cy="50" r="3" fill="#00D4FF" opacity="0.8" />
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
