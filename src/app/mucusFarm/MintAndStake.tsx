'use client'

import dynamic from "next/dynamic"

// components
import * as Skeleton from './Skeleton'
const Quantity = dynamic(() => import("./Quantity"), { loading: () => <Skeleton.Quantity /> })
const Support = dynamic(() => import("./Support"), { loading: () => <Skeleton.Support /> })
const Collection = dynamic(() => import("./Collection"), { loading: () => <Skeleton.Collection /> })

type MintAndStakeProps = {
  children: React.ReactNode,
}
export default function MintAndStake({ children }: MintAndStakeProps) {
  return (
    <div className='flex-grow z-10 flex flex-col gap-y-4 2xl:gap-y-6 mx-0 mr-auto mt-6 w-[65vw] xl:w-[60vw] 2xl:w-[50vw]'>
      <div className='flex gap-x-10'>
        <Quantity />
        <Support >
          {children}
        </Support>
      </div> 

      <Collection />
    </div>
  )
}

