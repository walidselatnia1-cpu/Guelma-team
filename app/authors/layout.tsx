import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function AuthorsLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
