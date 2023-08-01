'use client';

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/Button";

type IconHolderProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, href, onClick }: IconHolderProps) => (
  <Button className='px-6 py-2 border-2 border-white rounded-lg bg-mc-brown-300' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function Back() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname != '/') {
    return (
      // eslint-disable-next-line @typescript-eslint/unbound-method
      <IconHolder onClick={() => router.back()} >
        <p className='text-white text-sm font-bold tracking-wide'>BACK</p>
      </IconHolder>
    )
  }

  return null
}