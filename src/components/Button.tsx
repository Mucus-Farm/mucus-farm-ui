import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 pointer-cursor',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-lg py-2 px-4 text-sm focus:outline-none pointer-cursor',
}

type ButtonProps = {
  variant?: keyof typeof baseStyles;
  className?: string;
  href?: string;
  children: React.ReactNode;
} 
export function Button({
  variant = 'solid',
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    baseStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} >{children}</Link>
  ) : (
    <button className={className} {...props} >{children}</button>
  )
}
