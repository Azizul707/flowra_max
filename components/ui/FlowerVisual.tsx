import React from 'react';

interface FlowerVisualProps {
  id: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const FlowerVisual: React.FC<FlowerVisualProps> = ({
  id,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    hero: 'w-48 h-48 md:w-56 md:h-56',
  };

  // Distinct botanical petal & foliage renderers per flower
  const renderFlower = () => {
    switch (id) {
      case 'marigold':
        // Rich layered golden marigold (গাঁদা)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#d97706" opacity="0.3" filter="blur(8px)" />
            {/* Outer ruffled petals */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <ellipse
                key={`m-out-${deg}`}
                cx="50"
                cy="24"
                rx="8"
                ry="18"
                fill="#f59e0b"
                transform={`rotate(${deg} 50 50)`}
                opacity="0.9"
              />
            ))}
            {/* Mid layered petals */}
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
              <ellipse
                key={`m-mid-${deg}`}
                cx="50"
                cy="30"
                rx="6.5"
                ry="14"
                fill="#fbbf24"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Dense inner ruffled core */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse
                key={`m-in-${deg}`}
                cx="50"
                cy="38"
                rx="5"
                ry="9"
                fill="#d97706"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="#b45309" />
            <circle cx="50" cy="50" r="6" fill="#78350f" />
          </g>
        );

      case 'dahlia':
        // Multi-pointed symmetrical giant dahlia (ডালিয়া)
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#db2777" opacity="0.25" filter="blur(8px)" />
            {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
              <path
                key={`d-out-${deg}`}
                d="M50 14 C44 26, 44 38, 50 50 C56 38, 56 26, 50 14 Z"
                fill="#ec4899"
                transform={`rotate(${deg} 50 50)`}
                opacity="0.85"
              />
            ))}
            {[12, 36, 60, 84, 108, 132, 156, 180, 204, 228, 252, 276, 300, 324, 348].map((deg) => (
              <path
                key={`d-mid-${deg}`}
                d="M50 22 C46 32, 46 40, 50 50 C54 40, 54 32, 50 22 Z"
                fill="#f472b6"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={`d-core-${deg}`}
                d="M50 32 C48 38, 48 44, 50 50 C52 44, 52 38, 50 32 Z"
                fill="#be185d"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="7" fill="#831843" />
            <circle cx="50" cy="50" r="3" fill="#fef08a" />
          </g>
        );

      case 'petunia':
        // Trumpet flared velvety petunia (পিটুনিয়া)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#7c3aed" opacity="0.3" filter="blur(8px)" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={`p-lobe-${deg}`}
                d="M50 50 C30 30, 25 15, 50 10 C75 15, 70 30, 50 50 Z"
                fill="#8b5cf6"
                transform={`rotate(${deg} 50 50)`}
                opacity="0.9"
              />
            ))}
            {[36, 108, 180, 252, 324].map((deg) => (
              <path
                key={`p-in-${deg}`}
                d="M50 50 C36 36, 34 22, 50 18 C66 22, 64 36, 50 50 Z"
                fill="#a78bfa"
                transform={`rotate(${deg} 50 50)`}
                opacity="0.8"
              />
            ))}
            {/* Dark velvety center vein throat */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <line
                key={`p-vein-${deg}`}
                x1="50"
                y1="50"
                x2="50"
                y2="20"
                stroke="#4c1d95"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="11" fill="#4c1d95" />
            <circle cx="50" cy="50" r="6" fill="#fef08a" />
          </g>
        );

      case 'zinnia':
        // Saturated double zinnia (জিনিয়া)
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#dc2626" opacity="0.25" filter="blur(8px)" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <rect
                key={`z-out-${deg}`}
                x="45"
                y="12"
                width="10"
                height="26"
                rx="4"
                fill="#ef4444"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
              <rect
                key={`z-mid-${deg}`}
                x="46"
                y="20"
                width="8"
                height="20"
                rx="3.5"
                fill="#f97316"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Center golden ring florets */}
            <circle cx="50" cy="50" r="14" fill="#b91c1c" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <circle
                key={`z-floret-${deg}`}
                cx="50"
                cy="40"
                r="2.5"
                fill="#fde047"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#78350f" />
          </g>
        );

      case 'cosmos':
        // Delicate notched daisy-like cosmos (কসমস)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#f43f5e" opacity="0.2" filter="blur(8px)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <path
                key={`c-petal-${deg}`}
                d="M50 50 C40 32, 41 18, 47 12 Q50 14 53 12 C59 18, 60 32, 50 50 Z"
                fill="#fb7185"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Inner soft overlay */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
              <ellipse
                key={`c-mid-${deg}`}
                cx="50"
                cy="28"
                rx="4"
                ry="12"
                fill="#f43f5e"
                opacity="0.35"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="11" fill="#eab308" />
            <circle cx="50" cy="50" r="8" fill="#ca8a04" />
            <circle cx="50" cy="50" r="4" fill="#78350f" />
          </g>
        );

      case 'butterfly-pea':
        // Deep sapphire butterfly pea (অপরাজিতা)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#2563eb" opacity="0.3" filter="blur(8px)" />
            {/* Big royal banner petal */}
            <path
              d="M50 82 C20 75, 10 35, 30 18 C40 10, 60 10, 70 18 C90 35, 80 75, 50 82 Z"
              fill="#1d4ed8"
            />
            {/* Inner sapphire gradient */}
            <path
              d="M50 78 C28 72, 20 40, 36 24 C44 17, 56 17, 64 24 C80 40, 72 72, 50 78 Z"
              fill="#2563eb"
            />
            {/* Pale yellow/white center throat */}
            <path
              d="M50 75 C38 70, 36 48, 45 38 C48 35, 52 35, 55 38 C64 48, 62 70, 50 75 Z"
              fill="#dbeafe"
            />
            <ellipse cx="50" cy="56" rx="6" ry="12" fill="#fef08a" />
            <circle cx="50" cy="62" r="3" fill="#84cc16" />
          </g>
        );

      case 'sunflower':
        // Radiant golden mini sunflower (সূর্যমুখী)
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#eab308" opacity="0.25" filter="blur(8px)" />
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
              <path
                key={`s-out-${deg}`}
                d="M50 14 C46 26, 46 36, 50 50 C54 36, 54 26, 50 14 Z"
                fill="#facc15"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350].map((deg) => (
              <path
                key={`s-mid-${deg}`}
                d="M50 18 C47 28, 47 38, 50 50 C53 38, 53 28, 50 18 Z"
                fill="#eab308"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Rich seed disk */}
            <circle cx="50" cy="50" r="18" fill="#451a03" />
            <circle cx="50" cy="50" r="15" fill="#78350f" stroke="#92400e" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="8" fill="#3f1a07" />
          </g>
        );

      case 'dianthus':
        // Serrated carnation dianthus (ডায়ান্থাস)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#db2777" opacity="0.25" filter="blur(8px)" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={`dia-${deg}`}
                d="M50 50 C38 35, 30 20, 35 14 Q38 17 42 13 Q46 17 50 12 Q54 17 58 13 Q62 17 65 14 C70 20, 62 35, 50 50 Z"
                fill="#f43f5e"
                stroke="#881337"
                strokeWidth="1.5"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {[36, 108, 180, 252, 324].map((deg) => (
              <path
                key={`dia-mid-${deg}`}
                d="M50 50 C42 38, 36 28, 40 22 Q45 25 50 20 Q55 25 60 22 C64 28, 58 38, 50 50 Z"
                fill="#fda4af"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="#9f1239" />
            <circle cx="50" cy="50" r="5" fill="#fbcfe8" />
          </g>
        );

      case 'calendula':
        // Medicinal vibrant calendula (ক্যালেন্ডুলা)
        return (
          <g>
            <circle cx="50" cy="50" r="42" fill="#ea580c" opacity="0.25" filter="blur(8px)" />
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
              <ellipse
                key={`cal-${deg}`}
                cx="50"
                cy="22"
                rx="5"
                ry="17"
                fill="#f97316"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map((deg) => (
              <ellipse
                key={`cal-in-${deg}`}
                cx="50"
                cy="27"
                rx="4"
                ry="13"
                fill="#fb923c"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="13" fill="#c2410c" />
            <circle cx="50" cy="50" r="8" fill="#7c2d12" />
          </g>
        );

      case 'morning-glory':
      default:
        // Twining blue-violet morning glory (মর্নিং গ্লোরি / ফ্লক্স)
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#6d28d9" opacity="0.3" filter="blur(8px)" />
            {/* Star-funnel bell */}
            <circle cx="50" cy="50" r="38" fill="#7c3aed" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={`mg-ray-${deg}`}
                d="M50 50 L46 16 L54 16 Z"
                fill="#c084fc"
                opacity="0.8"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Soft pink star throat */}
            <circle cx="50" cy="50" r="22" fill="#a855f7" />
            <circle cx="50" cy="50" r="14" fill="#f472b6" />
            <circle cx="50" cy="50" r="8" fill="#fef08a" />
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
      title={name}
      aria-label={name}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {renderFlower()}
      </svg>
    </div>
  );
};
