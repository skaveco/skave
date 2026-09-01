import Image from "next/image";

type PartnerCardProps = {
  name: string;
  description: string;
};

export function PartnerCard({ name, description }: PartnerCardProps) {
  return (
    <article className="flex min-w-0 flex-col items-start gap-[1.375rem]">
      <Image
        src="/partners/bridge.svg"
        alt={name}
        width={89}
        height={30}
        className="h-[1.8171rem] w-[5.5625rem]"
      />
      <p className="type-body-sm text-text-02">{description}</p>
    </article>
  );
}
