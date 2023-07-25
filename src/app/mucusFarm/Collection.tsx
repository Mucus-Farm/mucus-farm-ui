'use client'

import Image from 'next/image'
import { useQuery } from 'wagmi'
import { useAccount } from 'wagmi'

// components
import { Button } from "@/components/Button"
import { ConnectWrapper } from '@/components/ConnectWrapper';

// hooks
import useFaction from '@/hooks/useFaction';

// utils
import { factionColorPalette as fcp } from './utils';
import { env } from '@/env.mjs'
import type { Owner } from '@/db/schema'

const LeftArrow = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 25" fill="none" className={className} >
    <path d="M0 12.8323L22.6431 0.853186L22.6431 24.8114L0 12.8323Z" fill="#E17D59"/>
  </svg>
)

const RightArrow = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none" className={className}>
    <path d="M23.1907 12.8323L0.547596 24.8114V0.853172L23.1907 12.8323Z" fill="#E17D59"/>
  </svg>
)

const getOwnedNfts = async (address: `0x${string}`) => {
  const res = await fetch(`${env.NEXT_PUBLIC_HOST}/api/getOwnedNfts/${address}`)

  return res.json() as Promise<Owner[]>
}

const getNftImages = (Nfts: Owner[]) => Nfts.map(nft => ({
  ...nft,
  image: `${env.NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT}/${nft.id}`,
}))

export default function Collection() {
  const selectedNfts = [1, 2]
  const dailyYield = 9214.24
  const totalYield = 55640.32

  const { faction, setFaction } = useFaction(state => state)
  const { address } = useAccount()
  const ownedNfts = useQuery(['getOwnedNfts'], () => getOwnedNfts(address!), { enabled: !!address })

  console.log("owned tokenIds: ", ownedNfts?.data)

  return (
    <div className={`relative flex flex-col items-center p-4 rounded-xl bg-mc-black-500 ${fcp[faction].text}`} >
      <div className='absolute top-0 inset-x-0 flex justify-between p-4'>
        <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>Collection</h3>

        <Button className={`flex items-center gap-x-1 px-1 py-0 border-2 rounded-xl ${fcp[faction].border}`}>
          <p className='font-normal text-white'>Giga</p>
          <div className='w-2 h-2 bg-white rounded-full mt-[1px]'/>
        </Button>
      </div>

      <div className='flex gap-x-16 mt-6'>
        <h2 onClick={() => setFaction('FROG')} className={`cursor-pointer text-2xl font-bold underline ${faction === 'FROG' ? fcp[faction].text : 'text-white/60' }`}>FROGS</h2>
        <h2 onClick={() => setFaction('DOG')} className={`cursor-pointer text-2xl font-bold underline ${faction === 'DOG' ? fcp[faction].text : 'text-white/60' }`}>DOGS</h2>
      </div>

      <div className='flex flex-wrap p-10 gap-8 bg-black/25 rounded-xl mt-6 w-full '>
        {getNftImages(ownedNfts?.data || []).map(({ id, image }) => (
          <div className={`border-2 overflow-hidden ${selectedNfts.includes(id) ? 'border-white' : fcp[faction].border} w-[100px] h-[100px]`} key={id}>
            <Image
              className='w-full object-contain'
              src={image}
              width={100}
              height={100}
              alt={`nft-${id}`}
              unoptimized
            />
          </div>
        ))}
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

      <div className='flex justify-between w-[400px] px-4 mt-4'>
        <ConnectWrapper className={`bg-transparent mx-auto ${fcp[faction].text}`}>
          <Button
            className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
          >
            Upgrade
          </Button>

          <Button
            className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
          >
            Stake
          </Button>

          <Button
            className={`px-2 py-1 ${fcp[faction].bg} text-sm border border-white text-white font-normal`}
          >
            Unstake
          </Button>

          <Button
            className={`px-2 py-1 bg-white text-sm border ${fcp[faction].border} ${fcp[faction].text} font-normal`}
          >
            Claim
          </Button>
        </ConnectWrapper>
      </div>
    </div>
  )
}

