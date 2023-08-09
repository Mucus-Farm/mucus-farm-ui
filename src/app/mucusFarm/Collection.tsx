'use client'

import { useState, useEffect } from 'react'
import type { SetStateAction, Dispatch } from 'react'
import dynamic from 'next/dynamic'
import { useInfiniteQuery, useAccount, useQuery } from 'wagmi'
import { formatEther } from 'viem'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'

// utils
import { factionColorPalette as fcp, getOwnedNfts, getNftImages, getType, getDailyYield, type Cursor, getTotalMucusFarmed } from './utils';
import type { Faction } from '@/utils/constants'
import type { Owner } from '@/db/schema'
import { truncate } from '@/utils/helpers'

// components
import { Button } from "@/components/Button"
import { ConnectWrapperSkeleton } from '@/components/ConnectWrapper'
const ConnectWrapper = dynamic(() => import('@/components/ConnectWrapper'), { loading: () => <ConnectWrapperSkeleton className='justify-self-center bg-black/40 mx-auto w-24'/> })
import Modal from '@/components/Modal'
import Tooltip from '@/components/Tooltip'
import { AddManyToMucusFarmTransaction } from '@/components/transactions/AddManyToMucusFarm'
import { ClaimManyTransaction } from '@/components/transactions/ClaimMany'
import { TransformTransaction } from '@/components/transactions/Transform'

// hooks
import useFaction from '@/hooks/useFaction';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Checkbox } from '@/components/inputs/Checkbox'
import Question from '@/images/icons/heroQuestion'

type ContractMethodButtonsProps = {
  faction: Faction;
  selectedNfts: number[];
  selectAll: boolean;
  setSelectedNfts: Dispatch<SetStateAction<number[]>>;
}
function ContractMethodButtons({ faction, selectedNfts, selectAll, setSelectedNfts }: ContractMethodButtonsProps) {
  const [showUpgrade, setShowUpgrade] = useState<boolean>(false)
  const [showStake, setShowStake] = useState<boolean>(false)
  const [showUnstake, setShowUnstake] = useState<boolean>(false)
  const [showClaim, setShowClaim] = useState<boolean>(false)
  const [transactionValues, setTransactionValues] = useState<{ transformationType: Faction; tokenIds: number[]; selectAll: boolean; } | null>(null)

  const startTransaction = (setShow: Dispatch<SetStateAction<boolean>>) => {
    setTransactionValues({ transformationType: faction, tokenIds: selectedNfts, selectAll })
    setSelectedNfts([])
    setShow(true)
  }

  return (
    <div className='flex-grow flex justify-between'>
      <Modal open={showUpgrade} onClose={() => setShowUpgrade(false)}>
        <TransformTransaction {...transactionValues!} onClose={() => setShowUpgrade(false)} />
      </Modal>
      <Modal open={showStake} onClose={() => setShowStake(false)}>
        <AddManyToMucusFarmTransaction {...transactionValues!} onClose={() => setShowStake(false)} />
      </Modal>
      <Modal open={showUnstake} onClose={() => setShowUnstake(false)}>
        <ClaimManyTransaction {...transactionValues!} unStake onClose={() => setShowUnstake(false)} />
      </Modal>
      <Modal open={showClaim} onClose={() => setShowClaim(false)}>
        <ClaimManyTransaction {...transactionValues!} selectAll unStake={false} onClose={() => setShowClaim(false)} />
      </Modal>

      <Button
        onClick={() => startTransaction(setShowUpgrade)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Upgrade
      </Button>

      <Button
        onClick={() => startTransaction(setShowStake)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Stake
      </Button>

      <Button
        onClick={() => startTransaction(setShowUnstake)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Unstake
      </Button>

      <Button
        onClick={() => startTransaction(setShowClaim)}
        className={`px-2 py-1 bg-white text-sm border ${fcp[faction].border} ${fcp[faction].text} font-normal`}
      >
        Claim
      </Button>
    </div>
  )
}

const SelectAllTooltip = () => {
  return (
    <div className='text-center bg-[#1a1c28] w-[300px] rounded-lg px-4 py-2 break-all mb-1'>
      applies to ALL frogs and dogs <br/>
      (upgraded frogs and dogs too)
    </div>
  )
}

export default function Collection() {
  const [selectedNfts, setSelectedNfts] = useState<number[]>([])
  const [gigaOn, setGigaOn] = useState<boolean>(false)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const { faction, setFaction } = useFaction(state => state)
  const { address } = useAccount()

  const totalMucusFarmed = useQuery(['getTotalMucusFarmed', address], () => getTotalMucusFarmed(address!), { enabled: !!address, suspense: true })
  const dailyYield = useQuery(['getDailyYield', address], () => getDailyYield(address!), { enabled: !!address, suspense: true })
  const ownedNfts = useInfiniteQuery(
    ['getOwnedNfts', faction, gigaOn, address],
    ({ pageParam }) => getOwnedNfts(address!, getType(faction, gigaOn), pageParam as Cursor),
    { enabled: !!address, getNextPageParam: (lastPage) => lastPage.nextCursor }
  )
  const { observer, lastElementRef: lastNftRef } = useIntersectionObserver(ownedNfts as unknown as UseInfiniteQueryResult)
  const allOwnedNfts = ownedNfts.data?.pages.reduce((acc, page) => [...acc, ...(page?.nfts ?? [])], [] as Owner[]) || []

  const setSelectAllAndResetSelected = (checked: boolean) => {
    setSelectAll(checked)
    setSelectedNfts([])
  }

  useEffect(() => {
    if (address) setSelectedNfts([]) 
  }, [gigaOn, faction, address])

  return (
    <div className={`flex-grow relative flex flex-col items-center p-4 rounded-xl bg-mc-black-500 ${fcp[faction].text}`} >
      <div className='absolute top-4 inset-x-0 flex justify-between px-4'>
        <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>Collection</h3>

        <Button className={`cursor-pointer flex items-center gap-x-1 px-1 py-0 border-2 rounded-xl ${fcp[faction].border}`} onClick={() => setGigaOn(prev => !prev)}>
          <p className='font-normal text-white'>{faction === 'DOG' ? 'Chad' : 'Giga'}</p>
          <div className={`w-2 h-2 rounded-full mt-[1px] ${gigaOn ? fcp[faction].bg : 'bg-white'}`}/>
        </Button>
      </div>

      <div className='z-10 flex gap-x-16 mt-6'>
        <h2 onClick={() => setFaction('FROG')} className={`cursor-pointer text-2xl font-bold underline ${faction === 'FROG' ? fcp[faction].text : 'text-white/60' }`}>FROGS</h2>
        <h2 onClick={() => setFaction('DOG')} className={`cursor-pointer text-2xl font-bold underline ${faction === 'DOG' ? fcp[faction].text : 'text-white/60' }`}>DOGS</h2>
      </div>

      <div className='self-end flex items-center gap-x-2 mt-6 pr-5'>
        <Tooltip tooltip={<SelectAllTooltip />} >
          <Question className='w-4 h-4 -mr-1'/>
        </Tooltip> 
        <p className={`text-sm ${fcp[faction].text} font-bold`}>SELECT ALL</p>
        <Checkbox name='selectAll' onClick={e => setSelectAllAndResetSelected((e.target as EventTarget & { checked: boolean }).checked )}/>
      </div>

      <div className='flex flex-grow px-4 w-full mt-2'>
        <div className='h-[350px] relative flex-grow flex flex-wrap p-10 gap-8 bg-black/25 rounded-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
          {getNftImages(allOwnedNfts).map(({ id, image, staked }, i) => (
            <div
              onClick={() => setSelectedNfts(prev => prev.includes(id) ? prev.filter(nftId => nftId !== id) : [...prev, id])}
              className={`relative cursor-pointer border-2 overflow-hidden ${selectAll || selectedNfts.includes(id) ? fcp[faction].border : 'border-white'} w-[100px] h-[100px] transition-all`}
              ref={i === allOwnedNfts.length - 1 ? lastNftRef : undefined}
              key={id}
            >
              <img
                className='w-full object-contain'
                src={image}
                width={100}
                height={100}
                alt={`nft-${id}`}
              />
              <div className={`absolute top-1 right-1 rounded-md px-1 py-0 ${fcp[faction].bg} ${staked ? 'opacity-100' : 'opacity-0'}`}>
                <p className='text-[10px] text-white'>STAKED</p>
              </div>
            </div>
          ))}
          <div className={`absolute bottom-4 right-10 `}/>
        </div>
      </div> 

      <div className={`p-4 bg-black/25 rounded-xl gap-y-2 w-[400px] mt-2 text-sm ${fcp[faction].text}`}>
        <p>Mucus Generated</p>
        <div className='flex justify-between ml-4'>
          <p>Daily Yield</p>
          <p>{dailyYield?.data || '0'}</p>
        </div>
        <div className='flex justify-between ml-4'>
          <p>Total Farmed</p>
          <p>{truncate(formatEther(BigInt(totalMucusFarmed.data?.amount || '0')))}</p>
        </div>
      </div>

      <div className='flex w-[400px] px-4 mt-4'>
        <ConnectWrapper className={`justify-self-center bg-transparent mx-auto ${fcp[faction].text}`}>
          <ContractMethodButtons faction={faction} selectedNfts={selectedNfts} selectAll={selectAll} setSelectedNfts={setSelectedNfts} />
        </ConnectWrapper>
      </div>
    </div>
  )
}

