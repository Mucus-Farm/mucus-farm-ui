import { twMerge } from "tailwind-merge"

type NumberInputProps = React.DOMAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}
export function NumberInput({ className, ...props}: NumberInputProps) {
  return (
    <input
      name='deposit'
      type='text'
      inputMode="decimal"
      autoComplete='off'
      pattern='[0-9]*'
      placeholder='0.0'
      minLength={1}
      maxLength={79}
      spellCheck='false'
      className={twMerge('p-0 m-0 outline-none border-none focus:outline-none text-white placeholder-white/60 text-xl font-bold w-full h-[24px] bg-transparent', className)}
      {...props}
    />
  )
}
