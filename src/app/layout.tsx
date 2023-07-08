import "@/styles/globals.css";
import { Goldman } from "next/font/google";

const goldman = Goldman({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-goldman"
})

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

      <body>{children}</body> 
    </html>
  )
}