
import { type UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge"

type CheckboxProps = Partial<React.DOMAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>> & {
  className?: string;
  name: string;
  register: UseFormRegister<any>;
}
export function Checkbox({ className, name, register, ...props}: CheckboxProps) {
  return (
    <input
      {...register(name)}
      type="checkbox"
      className={twMerge("h-[13px] w-[13px] accent-indigo-600 border-gray-300 text-indigo-600 focus:ring-indigo-500", className)}
      {...props}
    />
  )
}