import { type UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge"

type NumberInputProps = Partial<React.DOMAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>> & {
  className?: string;
  name: string;
  register: UseFormRegister<any>;
}
export function NumberInput({ className, name, register, ...props}: NumberInputProps) {
  return (
    <input
      {...register(name)}
      type='text'
      inputMode="decimal"
      autoComplete='off'
      pattern='[0-9]*'
      placeholder='0.0'
      minLength={1}
      maxLength={79}
      spellCheck='false'
      className={twMerge('p-0 m-0 outline-none border-none focus:outline-none text-white placeholder-white/60 xl:text-lg 2xl:text-xl font-bold w-full h-[24px] bg-transparent', className)}
      {...props}
    />
  )
}
