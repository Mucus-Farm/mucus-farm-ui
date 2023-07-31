'use client'

import { useRef, useEffect } from 'react'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'

export default function useIntersectionObserver(infiniteQuery: UseInfiniteQueryResult) {
  const fetchOnLastElement = (entries: IntersectionObserverEntry[]) => {
    const [lastElement] = entries
    if (lastElement!.isIntersecting && infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
      infiniteQuery.fetchNextPage().catch(err => console.error(err))
    }
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = (node: HTMLDivElement) => {
      if (infiniteQuery.isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(fetchOnLastElement, options)
      if (node) observer.current.observe(node);
    }

  useEffect(() => {
    observer.current = new IntersectionObserver(fetchOnLastElement, options) 

    return () => {
      if (observer.current) observer.current.disconnect()
    }   
  }, [])

  return {
    observer: observer.current,
    lastElementRef,
  }
}
