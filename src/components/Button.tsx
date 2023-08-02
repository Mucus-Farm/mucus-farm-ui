'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold focus:outline-0 active:outline-0 ring-0 cursor-pointer transition-all',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-lg px-4 py-2 text-sm focus:outline-none cursor-pointer transition-all',
}

type ButtonProps = {
  variant?: keyof typeof baseStyles;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
} 
export function Button({
  variant = 'solid',
  className,
  href,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  className = twMerge(
    baseStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} >{children}</Link>
  ) : (
    <button className={className} type={type} {...props} >{children}</button>
  )
}
