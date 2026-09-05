import Image from "next/image";

import { SplanLogo } from "@/components/ui/splan-logo";

import type { Dictionary } from "@/app/[lang]/dictionaries";

type CustomersSectionProps = {
  content: Dictionary["customers"];
};

const customerLogos = [
  {
    key: "orbita",
    content: (
      <span className="relative block aspect-[5/1] w-[7.2rem] max-w-[80%]">
        <Image
          src="/customers/orbita.svg"
          alt=""
          fill
          className="object-contain"
        />
      </span>
    ),
  },
  {
    key: "facilita",
    content: (
      <span className="flex aspect-[5/1.5533] w-[6rem] max-w-[80%] items-center gap-[8.136%]">
        <Image
          src="/customers/facilita-mark.svg"
          alt=""
          width={25}
          height={25}
          className="h-auto w-[31.048%] shrink-0"
        />
        <Image
          src="/customers/facilita-wordmark.svg"
          alt=""
          width={49}
          height={11}
          className="h-auto w-[60.772%] shrink-0"
        />
      </span>
    ),
  },
  {
    key: "leads2b",
    content: (
      <span className="flex aspect-[6.25/1.4996] w-[6.25rem] max-w-[80%] items-center gap-[5.9984%]">
        <Image
          src="/customers/leads2b-mark.svg"
          alt=""
          width={22}
          height={22}
          className="h-auto w-[21.976%] shrink-0"
        />
        <Image
          src="/customers/leads2b-wordmark.svg"
          alt=""
          width={72}
          height={13}
          className="h-auto w-[72.0256%] shrink-0"
        />
      </span>
    ),
  },
  {
    key: "drSim",
    content: (
      <Image src="/customers/dr-sim.svg" alt="" width={94} height={25} className="aspect-[94/24.9688] h-auto w-[5.875rem] max-w-[80%]" />
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
        className="aspect-[76.8298/16.189] h-auto w-[5rem] max-w-[80%]"
      />
    ),
  },
  {
    key: "sults",
    content: (
      <Image src="/customers/sults.svg" alt="" width={105} height={28} className="aspect-[105/28] h-auto w-[5.9rem] max-w-[80%]" />
    ),
  },
  {
    key: "smartPedidos",
    content: (
      <span className="relative block aspect-[8.5/0.8226] w-[8.5rem] max-w-[80%]">
        <Image
          src="/customers/smart-pedidos-mark.svg"
          alt=""
          width={15}
          height={13}
          className="absolute left-0 top-0 h-auto w-[10.7682%]"
        />
        <span className="absolute left-[13.5412%] top-0 h-full w-[85.6%]">
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
            className="absolute -right-[0.9758%] top-0 h-auto w-[1.9654%]"
          />
        </span>
      </span>
    ),
  },
  {
    key: "normedic",
    content: (
      <span className="flex aspect-[6.875/0.8912] w-[7.2rem] max-w-[80%] items-center gap-[4.8116%]">
        <Image
          src="/customers/normedic-mark.svg"
          alt=""
          width={20}
          height={14}
          className="h-auto w-[17.7396%] shrink-0"
        />
        <Image
          src="/customers/normedic-wordmark.svg"
          alt=""
          width={84}
          height={14}
          className="h-auto w-[76.192%] shrink-0"
        />
      </span>
    ),
  },
  {
    key: "clickCannabis",
    content: (
      <span className="relative block aspect-[124/22.2765] w-[9rem] max-w-[80%]">
        <Image
          src="/customers/click-cannabis.svg"
          alt=""
          fill
          className="object-contain"
        />
      </span>
    ),
  },
  {
    key: "splan",
    content: <SplanLogo className="aspect-[74/34] h-auto w-[5rem] max-w-[80%]" />,
  },
] as const;

// Figma: Website Skave 3.0, node 2753:4715.
export function CustomersSection({ content }: CustomersSectionProps) {
  return (
    <section
      id="clientes"
      aria-labelledby="customers-title"
      className="relative bg-background-01 px-[1.25rem] py-[2.5rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] border-b border-divider tablet:border-0"
    >
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

        </div>
      </div>
    </section>
  );
}
