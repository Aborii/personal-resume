import { redirect } from "next/navigation";

export default function PdfResumePreviewLayout({ children }: { children: React.ReactNode }) {
  // Only allow access in development mode
  if (process.env.NODE_ENV !== "development") redirect("/");

  return <>{children}</>;
}
