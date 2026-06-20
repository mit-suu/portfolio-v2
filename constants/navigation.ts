import {
  Award,
  Code2,
  FolderKanban,
  Mail,
  UserRound,
  Workflow,
} from "lucide-react";
import type { NavigationItem } from "@/types/portfolio";

export const navigation: NavigationItem[] = [
  { id: "about", label: "About", href: "#about", icon: UserRound },
  { id: "skills", label: "Skills", href: "#skills", icon: Code2 },
  { id: "experience", label: "Experience", href: "#experience", icon: Workflow },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderKanban },
  { id: "achievements", label: "Achievements", href: "#achievements", icon: Award },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];
