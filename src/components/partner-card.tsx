import Image from "next/image";

import { TextAnimate } from "@/components/ui/text-animate";

type PartnerCardProps = {
  name: string;
  description: string;
  delay?: number;
  logo?: "bridge" | "cozia";
};

export function PartnerCard({ name, description, delay = 0, logo = "bridge" }: PartnerCardProps) {
  return (
    <article className="flex min-w-0 flex-col items-start gap-[1.375rem]">
      {logo === "cozia" ? (
        <span
          role="img"
          aria-label={name}
          className="block h-[2.0625rem] w-[4.875rem] bg-text-01"
          style={{
            maskImage: 'url("/results/cozia-logo.svg")',
            maskSize: "contain",
            maskPosition: "center",
            maskRepeat: "no-repeat",
          }}
        />
      ) : <Image
        src="/partners/bridge.svg"
        alt={name}
        width={89}
        height={30}
        className="h-[2.2rem] w-[5.5625rem]"
      />}
      <p className="type-body-sm text-text-02">
        <TextAnimate
          animation="shimmer-sweep"
          duration={500}
          delay={delay}
        >
          {description}
        </TextAnimate>
      </p>
    </article>
  );
}
