import Banner from "@/components/Banner";
import { Providers } from "./providers";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <main>
          <Providers>
            <Banner />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
