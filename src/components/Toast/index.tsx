import Checkmark from '@/images/icons/solidCheck'
import ExclamationCircle from '@/images/icons/solidExclamation'

type ToastProps = { children: React.ReactNode }
const Toast = ({ children }: ToastProps) => (
  <div className='fixed bottom-0 right-4 flex items-center gap-x-2 p-4 bg-mc-pink-200 rounded-xl shadow-md z-[99] animate-toast'>
    {children}
  </div>
)

export const SuccessToast = () => (
  <Toast>
    <Checkmark className='w-[50px] h-[35px] text-green-500' />
    <p className='font-bold text-lg text-mc-mahogany-300'>SUCCESS</p>
  </Toast>
)

export const FailToast = ({ errorMessage }: { errorMessage: string | null }) => (
  <Toast>
    <ExclamationCircle className='w-[50px] h-[35px] text-red-500' />
    <p className='font-bold text-lg text-mc-mahogany-300'>{errorMessage ?? 'TRANSACTION FAILED'}</p>
  </Toast>
)


export default Toast