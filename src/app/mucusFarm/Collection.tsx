'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useInfiniteQuery, useAccount } from 'wagmi'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'

// components
import { Button } from "@/components/Button"
import { ConnectWrapper } from '@/components/ConnectWrapper';
import Modal from '@/components/Modal'
import { AddManyToMucusFarmTransaction } from '@/components/transactions/AddManyToMucusFarm'
import { ClaimManyTransaction } from '@/components/transactions/ClaimMany'
import { TransformTransaction } from '@/components/transactions/Transform'

// hooks
import useFaction from '@/hooks/useFaction';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// utils
import { factionColorPalette as fcp } from './utils';
import { env } from '@/env.mjs'
import type { Owner } from '@/db/schema'
import type { Faction } from '@/utils/constants'

type Cursor = number | undefined
const getOwnedNfts = async (address: `0x${string}`, type: 'DOG' | 'FROG' | 'CHAD' | 'GIGA', cursor: Cursor) => {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getOwnedNfts`, {
    method: 'POST',
    body: JSON.stringify({ address, type, cursor }),
  })

  return res.json() as Promise<{ nfts: Owner[], nextCursor: Cursor }>
}

const getNftImages = (Nfts: Owner[]) => Nfts.map(nft => ({
  ...nft,
  image: `${env.NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT}/${nft.id}`,
}))

export const getType = (faction, gigaOn) => {
  if (faction === 'DOG' && !gigaOn) return 'DOG'
  if (faction === 'FROG' && !gigaOn) return 'FROG'
  if (faction === 'DOG' && gigaOn) return 'CHAD'
  
  return 'GIGA'
}

type ContractMethodButtonsProps = {
  faction: Faction,
  selectedNfts: number[],
}
function ContractMethodButtons({ faction, selectedNfts }: ContractMethodButtonsProps) {
  const [showUpgrade, setShowUpgrade] = useState<boolean>(false)
  const [showStake, setShowStake] = useState<boolean>(false)
  const [showUnstake, setShowUnstake] = useState<boolean>(false)
  const [showClaim, setShowClaim] = useState<boolean>(false)

  return (
    <div className='flex-grow flex justify-between'>
      <Modal open={showUpgrade} onClose={() => setShowUpgrade(false)}>
        <TransformTransaction tokenIds={selectedNfts} transformationType={faction} stake={false /*TODO: decide what to do here*/} onClose={() => setShowUpgrade(false)} />
      </Modal>
      <Modal open={showStake} onClose={() => setShowStake(false)}>
        <AddManyToMucusFarmTransaction tokenIds={selectedNfts} onClose={() => setShowStake(false)} />
      </Modal>
      <Modal open={showUnstake} onClose={() => setShowUnstake(false)}>
        <ClaimManyTransaction tokenIds={selectedNfts} unStake onClose={() => setShowUnstake(false)} />
      </Modal>
      <Modal open={showClaim} onClose={() => setShowClaim(false)}>
        <ClaimManyTransaction tokenIds={selectedNfts} unStake={false} onClose={() => setShowClaim(false)} />
      </Modal>

      <Button
        onClick={() => setShowUpgrade(true)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Upgrade
      </Button>

      <Button
        onClick={() => setShowStake(true)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Stake
      </Button>

      <Button
        onClick={() => setShowUnstake(true)}
        className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
      >
        Unstake
      </Button>

      <Button
        onClick={() => setShowClaim(true)}
        className={`px-2 py-1 bg-white text-sm border ${fcp[faction].border} ${fcp[faction].text} font-normal`}
      >
        Claim
      </Button>
    </div>
  )
}

export default function Collection() {
  const dailyYield = 9214.24
  const totalYield = 55640.32

  const [selectedNfts, setSelectedNfts] = useState<number[]>([])
  const [gigaOn, setGigaOn] = useState<boolean>(false)
  const { faction, setFaction } = useFaction(state => state)
  const { address } = useAccount()
  const ownedNfts = useInfiniteQuery(
    ['getOwnedNfts', faction, gigaOn, address],
    ({ pageParam }) => getOwnedNfts(address!, getType(faction, gigaOn), pageParam as Cursor),
    { enabled: !!address, getNextPageParam: (lastPage) => lastPage.nextCursor }
  )
  const { observer, lastElementRef: lastNftRef } = useIntersectionObserver(ownedNfts as unknown as UseInfiniteQueryResult)
  const allOwnedNfts = ownedNfts.data?.pages.reduce((acc, page) => [...acc, ...(page?.nfts ?? [])], [] as Owner[]) || []

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

      <div className='flex flex-grow px-4 mt-6 w-full'>
        <div className='relative flex-grow flex flex-wrap p-10 gap-8 bg-black/25 rounded-xl overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-transparent'>
          {getNftImages(allOwnedNfts).map(({ id, image, staked }, i) => (
            <div
              onClick={() => setSelectedNfts(prev => prev.includes(id) ? prev.filter(nftId => nftId !== id) : [...prev, id])}
              className={`relative cursor-pointer border-2 overflow-hidden ${selectedNfts.includes(id) ? fcp[faction].border : 'border-white'} w-[100px] h-[100px]`}
              ref={i === allOwnedNfts.length - 1 ? lastNftRef : undefined}
              key={id}
            >
              <Image
                className='w-full object-contain'
                src={image}
                width={100}
                height={100}
                alt={`nft-${id}`}
                unoptimized
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
          <p>Daily</p>
          <p>{dailyYield}</p>
        </div>
        <div className='flex justify-between ml-4'>
          <p>Total</p>
          <p>{totalYield}</p>
        </div>
      </div>

      <div className='flex w-[400px] px-4 mt-4'>
        <ConnectWrapper className={`justify-self-center bg-transparent mx-auto ${fcp[faction].text}`}>
          <ContractMethodButtons faction={faction} selectedNfts={selectedNfts} />
        </ConnectWrapper>
      </div>
    </div>
  )
}

