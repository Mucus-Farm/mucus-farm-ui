'use client'

import Image from 'next/image'

// components
import { Button } from "@/components/Button"
import { ConnectWrapper } from '@/components/ConnectWrapper';

// utils
import type { Faction } from "@/utils/constants";
import { factionColorPalette as fcp } from './utils';

// test images
import testNft1 from "@/images/test-nft-1.png"
import testNft2 from "@/images/test-nft-2.png"
import testNft3 from "@/images/test-nft-3.png"

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

type CollectionProps = { faction: Faction }
export default function Collection({ faction }: CollectionProps) {
  const pageNumber = 5
  const totalPages = 29
  const selectedNfts = [1, 2]
  const nfts = [
    { tokenId: 1, image: testNft1 },
    { tokenId: 2, image: testNft2 },
    { tokenId: 3, image: testNft3 },
  ]
  const dailyYield = 9214.24
  const totalYield = 55640.32

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
        <h2 className={`text-2xl font-bold underline ${faction === 'FROG' ? fcp[faction].text : 'text-white/60' }`}>FROGS</h2>
        <h2 className={`text-2xl font-bold underline ${faction === 'DOG' ? fcp[faction].text : 'text-white/60' }`}>DOGS</h2>
      </div>

      <div className='flex gap-x-8 mt-10 items-center'>
        <div className='cursor-pointer'>
          <LeftArrow className={`fill-current ${fcp[faction].text} w-7 mb-4`}/>
        </div> 
        <div className='flex flex-col'>
          <div className='flex gap-x-10'>
            {nfts.map(({ tokenId, image }) => (
              <div className={`border-2 overflow-hidden ${selectedNfts.includes(tokenId) ? 'border-white' : fcp[faction].border} w-[165px] h-[165px]`} key={tokenId}>
                <Image
                  className='w-full object-contain'
                  src={image}
                  alt={`nft-${tokenId}`}
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className={`ml-auto mt-2 ${fcp[faction].text}`}>{pageNumber} of {totalPages}</div>
        </div>
        <div className='cursor-pointer'>
          <RightArrow className={`fill-current ${fcp[faction].text} w-7 mb-4`}/>
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

