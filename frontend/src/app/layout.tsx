import Banner from "@/components/Banner";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Banner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
