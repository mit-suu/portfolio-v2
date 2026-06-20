import type { SocialLink as SocialLinkType } from "@/types/portfolio";

type SocialLinkProps = {
  social: SocialLinkType;
};

export function SocialLink({ social }: SocialLinkProps) {
  const Icon = social.icon;

  return (
    <a
      href={social.url}
      aria-label={social.label}
      target={social.url.startsWith("http") ? "_blank" : undefined}
      rel={social.url.startsWith("http") ? "noreferrer" : undefined}
      className="grid size-11 place-items-center rounded-lg border border-transparent text-on-surface-variant transition hover:border-outline-variant hover:bg-surface-container-high hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Icon className="size-5" aria-hidden="true" />
    </a>
  );
}
