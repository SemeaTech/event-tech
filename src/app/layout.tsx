import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Semea Tech",
  icons: [
    {
      rel: "icon",
      url: "/logo.svg",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          { children }
          <Toaster />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
