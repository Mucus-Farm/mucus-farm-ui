'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Clock() {
  const pathname = usePathname()
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    if (pathname === '/') {
      setInterval(() => setTime(new Date()), 1000)
    }
  }, [])
  
  if (pathname === '/') {
    return (
      <div className='shadow-inner px-6 py-2 rounded-lg w-[165px]'>
        <p className='text-slate-600 text-xl font-bold tracking-widest'>
          {time?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}
        </p> 
      </div>
    )
  }

  return null
}