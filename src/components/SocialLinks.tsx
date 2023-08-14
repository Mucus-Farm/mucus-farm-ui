'use client'

import { twMerge } from "tailwind-merge";

// components
import { Button } from "@/components/Button";

// Icons
import Twitter from "@/images/icons/twitter"
// import Discord from "@/images/icons/discord"
import Telegram from "@/images/icons/telegram"
import Etherscan from "@/images/icons/etherscan"

type IconHolderProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, className, href, onClick }: IconHolderProps) => (
  <Button className={twMerge('px-6 border-2 border-white rounded-lg bg-mc-brown-300/90 hover:bg-mc-brown-300/80 active:bg-mc-brown-300', className)} href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function SocialLinks({ iconHolderClassName }: { iconHolderClassName?: string }) {
  return (
    <>
      <IconHolder className={iconHolderClassName} onClick={() => window.open('https://twitter.com/mucushq', '_blank')} >
        <Twitter className='h-6 w-6 fill-white' />
      </IconHolder>
      <IconHolder className={iconHolderClassName} onClick={() => window.open('https://t.me/frogsvsdogs', '_blank')} >
        <Telegram className='h-6 w-6 fill-white' />
      </IconHolder>
      <IconHolder className={iconHolderClassName} onClick={() => window.open('https://etherscan.io/address/0xC4a41fc62BFc4eD3033CfF4bEFD21bbDcd811F64', '_blank')} >
        <Etherscan className='h-6 w-6 fill-white' />
      </IconHolder>
    </> 
  )
}
