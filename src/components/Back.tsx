'use client';

import { useRouter } from "next/router";
import { Button } from "@/components/Button";

type IconHolderProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, href, onClick }: IconHolderProps) => (
  <Button className='px-6 py-2 border-2 border-white rounded-lg bg-amber-800' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function Back() {
  const { pathname, back } = useRouter();

  if (pathname != '/') {
    return (
      <IconHolder onClick={back} >
        <p className='text-white text-sm font-bold tracking-wide'>BACK</p>
      </IconHolder>
    )
  }

  return null
}