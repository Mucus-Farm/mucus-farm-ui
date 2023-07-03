'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Clock() {
  const { pathname } = useRouter()
  const now = useRef(Date.now())
  const [time, setTime] = useState(now.current)

  useEffect(() => {
    setInterval(() => setTime(Date.now()), 1000)
  }, [])
  
  if (pathname === '/') {
    return (
      <div className='shadow-inner px-6 py-2 rounded-lg w-[140px]'>
        <p className='text-slate-600 text-lg tracking-widest text-center'>
          {new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })}
        </p> 
      </div>
    )
  }

  return null
}