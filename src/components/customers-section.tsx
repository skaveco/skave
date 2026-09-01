import Image from "next/image";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ThemeSectionObserver } from "@/components/ui/theme-section-observer";

type CustomersSectionProps = {
  content: Dictionary["customers"];
};

const customerLogos = [
  {
    key: "orbita",
    content: (
      <Image src="/customers/orbita.svg" alt="" width={120} height={24} />
    ),
  },
  {
    key: "facilita",
    content: (
      <span className="flex h-[1.5533rem] w-[5rem] items-center gap-[0.4068rem]">
        <Image
          src="/customers/facilita-mark.svg"
          alt=""
          width={25}
          height={25}
          className="size-[1.5524rem]"
        />
        <Image
          src="/customers/facilita-wordmark.svg"
          alt=""
          width={49}
          height={11}
          className="h-[0.6878rem] w-[3.0386rem]"
        />
      </span>
    ),
  },
  {
    key: "leads2b",
    content: (
      <span className="flex h-[1.4996rem] w-[6.25rem] items-center gap-[0.3749rem]">
        <Image
          src="/customers/leads2b-mark.svg"
          alt=""
          width={22}
          height={22}
          className="h-[1.359rem] w-[1.3735rem]"
        />
        <Image
          src="/customers/leads2b-wordmark.svg"
          alt=""
          width={72}
          height={13}
          className="h-[0.839rem] w-[4.5016rem]"
        />
      </span>
    ),
  },
  {
    key: "drSim",
    content: (
      <Image src="/customers/dr-sim.svg" alt="" width={94} height={25} />
    ),
  },
  {
    key: "setfin",
    content: (
      <Image
        src="/customers/setfin.svg"
        alt=""
        width={84}
        height={22}
        className="h-[1.0119rem] w-[4.8012rem]"
      />
    ),
  },
  {
    key: "sults",
    content: (
      <Image src="/customers/sults.svg" alt="" width={105} height={28} />
    ),
  },
  {
    key: "smartPedidos",
    content: (
      <span className="relative h-[0.8226rem] w-[8.5rem]">
        <Image
          src="/customers/smart-pedidos-mark.svg"
          alt=""
          width={15}
          height={13}
          className="absolute left-0 top-0 h-[0.8224rem] w-[0.9153rem]"
        />
        <span className="absolute left-[1.151rem] top-0 h-[0.8226rem] w-[7.276rem]">
          <Image
            src="/customers/smart-pedidos-wordmark.svg"
            alt=""
            fill
          />
          <Image
            src="/customers/smart-pedidos-detail.svg"
            alt=""
            width={3}
            height={3}
            className="absolute -right-[0.071rem] top-0 size-[0.143rem]"
          />
        </span>
      </span>
    ),
  },
  {
    key: "normedic",
    content: (
      <span className="flex h-[0.8912rem] w-[6.875rem] items-center gap-[0.3308rem]">
        <Image
          src="/customers/normedic-mark.svg"
          alt=""
          width={20}
          height={14}
          className="h-[0.8824rem] w-[1.2196rem]"
        />
        <Image
          src="/customers/normedic-wordmark.svg"
          alt=""
          width={84}
          height={14}
          className="h-[0.8912rem] w-[5.2382rem]"
        />
      </span>
    ),
  },
  {
    key: "clickCannabis",
    content: (
      <Image
        src="/customers/click-cannabis.svg"
        alt=""
        width={124}
        height={22}
      />
    ),
  },
] as const;

// Figma: Website Skave 3.0, node 2753:4715.
export function CustomersSection({ content }: CustomersSectionProps) {
  return (
    <section
      id="clientes"
      aria-labelledby="customers-title"
      className="relative bg-background-01 px-[1.25rem] py-[5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <ThemeSectionObserver />

      <div className="relative z-10 mx-auto flex w-full max-w-[86rem] flex-col gap-[0.625rem]">
        <h2 id="customers-title" className="type-label-md uppercase">
          {content.eyebrow}
        </h2>

        <div className="grid grid-cols-2 gap-[0.625rem] tablet:grid-cols-3 desktop:grid-cols-5">
          {customerLogos.map((logo, index) => (
            <div
              key={logo.key}
              role="img"
              aria-label={content.logos[index]}
              className="flex h-[7.75rem] min-w-0 items-center justify-center overflow-hidden border border-divider"
            >
              {logo.content}
            </div>
          ))}

          <div
            aria-hidden="true"
            className="h-[7.75rem] min-w-0 border border-divider"
          />
        </div>
      </div>
    </section>
  );
}
