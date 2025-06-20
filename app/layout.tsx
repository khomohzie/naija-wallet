import StyledComponentsRegistry from "@/utils/registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NaijaWallet",
  description: "Secure Digital Banking for Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
