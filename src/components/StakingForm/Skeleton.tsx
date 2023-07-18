
export const UserStats = () => {
  return (
    <div className='flex flex-col bg-mc-rose-300 rounded-xl p-6'>
      <h2 className='text-mc-mahogany-300 font-bold tracking-tight text-center 2xl:text-3xl xl:text-2xl'>LETS MAKE A PROMISE</h2>
      <p className='text-white text-center 2xl:text-lg xl:text-md'>PROTECT US AND WE OWE YOU</p>

      <div className='flex justify-between 2xl:mt-12 xl:mt-8 text-mc-mahogany-300 xl:text-sm'>
        <div className='flex items-center gap-x-2'>Total Deposited <div className='h-4 w-10 bg-mc-rose-400 rounded-full animate-pulse'/></div>
        <div className='flex items-center gap-x-2'>Staker Trading Rewards <div className='h-4 w-6 bg-mc-rose-400 rounded-full animate-pulse'/></div>
        <div className='flex items-center gap-x-2'>Your Deposit <div className='h-4 w-8 bg-mc-rose-400 rounded-full animate-pulse'/></div>
      </div>
    </div>
  )
}

export const Deposit = () => {
  return (
    <div className='basis-3/5 flex flex-col p-4 rounded-xl text-mc-mahogany-300 bg-mc-rose-300'>
      <h3 className='2xl:text-lg xl:text-md font-bold tracking-tight'>DEPOSIT</h3>

      <div className='flex flex-col gap-y-2 xl:text-sm 2xl:text-base'>
        <p className='text-md'>FROM</p>
        <div className='rounded-xl 2xl:h-16 h-12 w-full bg-mc-mahogany-200 animate-pulse' />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 2xl:mt-8'>
        <p className='text-md'>TO</p>
        <div className='rounded-xl h-12 2xl:h-16 w-full bg-mc-green-100 animate-pulse' />
      </div>

      <div className='text-mc-mahogany-300/60 mt-4 2xl:mt-8 text-sm'>
        <p>Est.Allocation</p>
        <div className='flex justify-between pl-4'>
          <p>MUCUS</p>
          <p>0</p>
        </div>
        <div className='flex justify-between pl-4'>
          <p>ETH</p>
          <p>0</p>
        </div>
        <div className='w-full border-b border-b-mc-green-100 border-dashed mt-1' />
      </div>

      <div className='text-mc-mahogany-300/60 mt-4 2xl:mt-12 text-sm'>
        <div className='flex justify-between items-center'>
          <p>Slippage</p>
          <div className='h-4 w-10 bg-mc-rose-400 rounded-full animate-pulse'/>
        </div>
        <div className='w-full border-b border-b-mc-green-100 border-dashed mt-2'></div>
      </div>

      <div className='flex-grow flex items-end'>
        <div className='h-6 w-full bg-mc-rose-400 rounded-full animate-pulse' /> 
      </div> 
    </div>
  )
}

export const Withdraw = () => {
  return (
    <div className='flex-grow flex gap-x-6 2xl:gap-x-10'>
      <div className='flex flex-col text-mc-mahogany-300'>
        <div className='bg-mc-rose-300 p-4 rounded-xl'>
          <h3 className='text-md 2xl:text-lg font-bold tracking-tight'>WITHDRAW</h3>

          <p className='text-md'>AMOUNT</p>
          <div className='flex rounded-xl h-12 2xl:h-16 bg-mc-mahogany-200 mt-1 animate-pulse' />

          <div className='flex justify-end gap-x-3 mt-4 2xl:mt-6'>
            <div className='h-6 w-12 bg-mc-rose-400 rounded-full animate-pulse' />
            <div className='h-6 w-24 bg-mc-rose-400 rounded-full animate-pulse' />
          </div>
        </div>
        <p className='text-sm 2xl:text-lg text-center whitespace-nowrap text-mc-mahogany-300 mt-6'>
          YOU MAY QUALIFY FOR A FREE MINT
        </p>
        <div className='text-center rounded-lg bg-white/50 border border-white p-4 text-lg 2xl:text-2xl text-mc-mahogany-300 w-full mt-1'>
          MUCUS GENERATOR
        </div>
      </div>
    </div> 
  )
}

