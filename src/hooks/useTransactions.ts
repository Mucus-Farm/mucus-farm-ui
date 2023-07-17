import { create } from 'zustand'

type State = { 
  transactionState: 'PENDING' | 'SUCCESS' | 'FAILED',
  errorMessage: string | null,
  setTransactionState: (txState: NonNullable<State['transactionState']>) => void
  setErrorMessage: (message: NonNullable<State['errorMessage']>) => void
}
const useTransactions = create<State>((set) => ({
  transactionState: 'PENDING',
  errorMessage: null,
  setTransactionState: (txState) => set((state) => ({ ...state, transactionState: txState })),
  setErrorMessage: (message) => set((state) => ({ ...state, errorMessage: message })),
}))

export default useTransactions
