type SectionHeadingProps = {
  children: React.ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-8 text-3xl font-semibold leading-tight text-on-surface">
      {children}
    </h2>
  );
}
