import {
  Roboto
} from 'next/font/google'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({ 
  weight: ["100", "300", "400", "500", "700", "900"],
  styles: ["bold", "italic", "normal"],
  subsets: ["latin"] });

export const metadata = {
  title: "Liga De Tenis",
  description: "Pagina para una liga de tenis",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={roboto.className} suppressHydrationWarning={true}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
