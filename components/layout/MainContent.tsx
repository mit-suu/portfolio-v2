type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return <div className="flex flex-col gap-28 lg:gap-32">{children}</div>;
}
