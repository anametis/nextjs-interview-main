import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
  size: number;
  rotation?: number;
  startingPosition?: number;
  orbitSpinTime?: number;
  orbitSpinDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  selfSpinTime?: number;
  selfSpinDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse";
};

const Orbit: React.FC<Props> = ({
  children,
  className = "",
  size,
  rotation = 0,
  startingPosition = 0,
  orbitSpinTime = 10,
  orbitSpinDirection = "normal",
  selfSpinTime = 7,
  selfSpinDirection = "normal",
}) => {
  return (
    <div
      className={twMerge(`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center`, className)}
    >
      <div
        style={{
          transform: `rotate(${startingPosition}deg)`,
        }}
      >
        <div
          className="animate-spin"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${orbitSpinTime}s`,
            animationDirection: orbitSpinDirection,
          }}
        >
          <div
            className="inline-flex animate-spin"
            style={{
              animationDuration: `${selfSpinTime}s`,
              animationDirection: selfSpinDirection,
            }}
          >
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orbit;