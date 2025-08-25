import { StarIcon, SparkleIcon } from "@/../public/icons/custom-icons";
import Orbit from "@/components/orbit";

export const Hero = () => {
  return (
    <div className="py-32 w-screen md:py-48 lg:py-60 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)] z-10">
        {/* ---------- The Stars Part ---------- */}
        <Orbit size={300} orbitSpinTime={50} rotation={90} selfSpinTime={30}>
          <StarIcon className="size-14 text-emerald-300" />
          <Orbit size={800} orbitSpinTime={30}>
            <StarIcon className="size-14 text-emerald-300/70" />
          </Orbit>
        </Orbit>
        <Orbit
          size={600}
          orbitSpinTime={20}
          selfSpinTime={10}
          orbitSpinDirection="reverse"
        >
          <StarIcon className="size-24 text-emerald-300 opacity-55" />
        </Orbit>
        <Orbit size={400} orbitSpinTime={22} selfSpinTime={11}>
          <StarIcon className="size-28 text-emerald-300 opacity-20" />
        </Orbit>
        <Orbit size={550} rotation={20}>
          <StarIcon className="size-12 text-emerald-300" />
        </Orbit>

        {/* ---------- The Sparkles Part ---------- */}
        <Orbit
          size={430}
          rotation={30}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={60}
        >
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </Orbit>
        <Orbit
          size={500}
          orbitSpinTime={0}
          selfSpinTime={0}
          orbitSpinDirection="reverse"
        >
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </Orbit>
        <Orbit
          size={450}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={270}
        >
          <SparkleIcon className="size-16 text-emerald-300/20" />
        </Orbit>
        <Orbit
          size={430}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={330}
          rotation={30}
        >
          <SparkleIcon className="size-4 text-emerald-300/20" />
        </Orbit>
        <Orbit
          size={470}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={190}
          rotation={-10}
        >
          <SparkleIcon className="size-4 text-emerald-300/20" />
        </Orbit>

        {/* ---------- The Circles Part ---------- */}
        <Orbit
          size={400}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={10}
        >
          <div className="size-3 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
        <Orbit
          size={500}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={70}
        >
          <div className="size-2 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
        <Orbit
          size={710}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={210}
        >
          <div className="size-3 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
        <Orbit
          size={555}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={150}
        >
          <div className="size-2 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
        <Orbit
          size={500}
          orbitSpinTime={0}
          selfSpinTime={0}
          startingPosition={260}
        >
          <div className="size-3 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
        <Orbit
          size={700}
          orbitSpinTime={0}
          selfSpinTime={0}
          rotation={200}
          startingPosition={-30}
        >
          <div className="size-3 bg-emerald-300/20 rounded-full"></div>
        </Orbit>
      </div>

      {/* ---------- The Main Part ---------- */}
      <div className="relative h-full w-screen z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-lightsaber-yellow transition-colors duration-200">
            Welcome to the Galaxy
          </h1>
          <p className="text-lg text-lightsaber-blue transition-colors duration-200">
            May the Force be with you
          </p>
        </div>
      </div>
    </div>
  );
};
