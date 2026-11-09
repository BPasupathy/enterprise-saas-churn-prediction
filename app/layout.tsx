import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise SaaS Churn | Analytics Dashboard",
  description: "Capstone analytics dashboard for enterprise SaaS churn risk modelling. Synthetic educational dataset.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
