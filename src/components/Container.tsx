import { twMerge } from 'tailwind-merge'

export const Container = ({ className, children, ...props }: { className?: string, children: React.ReactNode, props?: any }) => {
  return (
    <div
      className={twMerge('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 xl:max-w-[1600px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}
