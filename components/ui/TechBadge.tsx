type TechBadgeProps = {
  children: React.ReactNode;
  subtle?: boolean;
};

export function TechBadge({ children, subtle = false }: TechBadgeProps) {
  return (
    <span
      className={
        subtle
          ? "rounded-full border border-outline-variant/50 px-3 py-1 font-mono text-xs text-muted"
          : "rounded-full border border-outline-variant bg-surface-container-high px-3 py-1 font-mono text-xs text-on-surface"
      }
    >
      {children}
    </span>
  );
}
