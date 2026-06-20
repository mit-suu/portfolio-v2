import { Code2, Mail, Network } from "lucide-react";
import type { SocialLink } from "@/types/portfolio";
import { profile } from "./profile";

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: profile.github,
    icon: Code2,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: profile.linkedIn,
    icon: Network,
  },
  {
    id: "email",
    label: "Email",
    url: `mailto:${profile.email}`,
    icon: Mail,
  },
];
