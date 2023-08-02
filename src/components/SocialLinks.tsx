'use client'

// components
import { Button } from "@/components/Button";

// Icons
import Twitter from "@/images/icons/twitter"
import Discord from "@/images/icons/discord"

type IconHolderProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, href, onClick }: IconHolderProps) => (
  <Button className='px-6 border-2 border-white rounded-lg bg-mc-brown-300/90 hover:bg-mc-brown-300/80 active:bg-mc-brown-300' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function SocialLinks() {
  return (
    <>
      <IconHolder onClick={() => window.open('https://twitter.com/mucushq', '_blank')} >
        <Twitter className='h-6 w-6 fill-white' />
      </IconHolder>
      <IconHolder onClick={() => window.open('https://discord.gg/xHctHNgf', '_blank')} >
        <Discord className='h-6 w-6 fill-white' />
      </IconHolder>
    </> 
  )
}
