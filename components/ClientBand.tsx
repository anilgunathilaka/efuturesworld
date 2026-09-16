import Image from "next/image";
import { logoClients } from "@/content/logoClients";

export default function ClientBand() {
  const track = [...logoClients, ...logoClients];

  return (
    <div className="relative z-50 bg-bg py-8 sm:py-10">
      <div className="group overflow-hidden">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-16 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {track.map((client, i) => (
            <Image
              key={`${client.name}-${i}`}
              src={client.src}
              alt={client.name}
              width={client.width}
              height={client.height}
              className="h-8 w-auto shrink-0 object-contain opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
