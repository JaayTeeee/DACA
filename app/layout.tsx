import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DACA",
  description: "Decentralized | Anonymity | Desctructive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
