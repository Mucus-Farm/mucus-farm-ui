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
  <Button className='px-6 border-2 border-white rounded-lg bg-mc-brown' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function SocialLinks() {
  return (
    <div className='flex gap-x-4'>
      <IconHolder onClick={() => window.open('https://twitter.com/mucushq', '_blank')} >
        <Twitter className='h-6 w-6 fill-white' />
      </IconHolder>
      <IconHolder onClick={() => window.open('https://discord.gg/xHctHNgf', '_blank')} >
        <Discord className='h-6 w-6 fill-white' />
      </IconHolder>
    </div>
  )
}