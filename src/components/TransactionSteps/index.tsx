/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import useTransactions from '@/hooks/useTransactions';

export type StepElementProps = {
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  retry: () => Promise<void>;
  onClose: () => void;
}

type Step = {
  skip?: boolean;
  stepElement: (props: any) => React.ReactNode;
  action?: () => Promise<any>;
}
type TransactionProps = Step & {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}
const Transaction = ({ skip, step, stepElement, setStep, action, onClose }: TransactionProps) => {
  const { transactionState: status, setTransactionState, setErrorMessage } = useTransactions((state) => state)
  const [props, setProps] = useState<any>(null)

  const triggerAction = async () => {
    try {
      if (!action) return
      setTransactionState('PENDING')
      const nextProps = await action()

      setProps(nextProps)
      setTransactionState('SUCCESS')
      setStep((prevStep) => prevStep + 1)
    } catch (error: any) {
      setTransactionState('FAILED')
      console.error(error)
    }
  }

  useEffect(() => {
    if (skip) setStep((prevStep) => prevStep + 1)
    else triggerAction().catch(error => console.error(error))
  }, [step])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return stepElement({ ...props, retry: triggerAction, onClose, status })
}

type TransactionModalProps = { steps: Step[]; isLoading: boolean; onClose: () => void; Skeleton: () => React.ReactNode}
const TransactionSteps = ({ steps, isLoading, onClose, Skeleton }: TransactionModalProps) => {
  const [step, setStep] = useState<number>(0)

  if (!steps[step]) throw new Error('Invalid step')

  if (isLoading) return Skeleton()
  return <Transaction step={step} setStep={setStep} onClose={onClose} {...steps[step]!} />
}

export default TransactionSteps
