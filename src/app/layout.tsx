import "@/styles/globals.css";
import { Goldman } from "next/font/google";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";

const goldman = Goldman({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-goldman"
})

export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${goldman.variable} font-sans`}> 
      <head>
        <title>Mucus Farm</title>
        <meta name="description" content="Farm Mucus" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Providers>
          <Header />
          {children}
        </Providers> 
      </body> 
    </html>
  )
}