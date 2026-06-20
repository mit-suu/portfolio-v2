import { Code2, Mail, Network } from "lucide-react";
import { profile } from "@/constants/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const contactItems = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Connect professionally",
    href: profile.linkedIn,
    icon: Network,
  },
  {
    id: "github",
    label: "GitHub",
    value: "View repositories",
    href: profile.github,
    icon: Code2,
  },
];

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="pb-20">
      <SectionHeading>Contact</SectionHeading>
      <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">
        I am open to internship, fresher, and full-stack development opportunities.
        Whether you want to discuss a role, a project, or a technical idea, I would
        be happy to connect.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="card-surface rounded-lg p-6 transition hover:-translate-y-1 hover:border-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="grid size-12 place-items-center rounded-lg border border-outline-variant bg-surface-container-high text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-on-surface">{item.label}</h3>
              <p className="mt-2 break-words text-sm leading-6 text-on-surface-variant">
                {item.value}
              </p>
            </a>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
