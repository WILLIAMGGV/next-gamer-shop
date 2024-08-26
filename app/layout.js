import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TOP POWER GAMERS",
  description:
    "Venta y Recargas de Diamantes, Free Fire, Call of Dutty entre otros.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Acme&family=Bebas+Neue&family=Dosis&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
