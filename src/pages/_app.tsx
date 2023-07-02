import { type AppType } from "next/app";
import "@/styles/globals.css";
import { Goldman } from "@next/font/google";

const goldman = Goldman({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-goldman"
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${goldman.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
};

export default MyApp;
