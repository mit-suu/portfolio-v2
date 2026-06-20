import { MouseAura } from "@/components/effects/MouseAura";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { FakeLoading } from "@/components/ui/FakeLoading";
import { PageTransition } from "./PageTransition";
import { Sidebar } from "./Sidebar";

type PortfolioShellProps = {
  children: React.ReactNode;
};

export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <>
      <FakeLoading />
      <MouseAura />
      <ScrollProgress />
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <PageTransition>
          <main className="main-content">{children}</main>
        </PageTransition>
      </div>
    </>
  );
}
