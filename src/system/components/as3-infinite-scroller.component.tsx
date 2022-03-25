import { DependencyList, ReactElement, useCallback, useEffect } from 'react'

type AS3InfiniteScrollerProps = {
  children: ReactElement
  callback: () => void
  updateCallbackUsingDependencies: DependencyList
  allowScrollingWhen: boolean
}

export function AS3InfiniteScroller({
  children,
  callback,
  updateCallbackUsingDependencies,
  allowScrollingWhen,
}: AS3InfiniteScrollerProps) {
  const handleScroll = useCallback(() => {
    if (!allowScrollingWhen) return

    console.log(window.innerHeight + window.scrollY, document.body.offsetHeight)

    const percentage =
      (window.innerHeight + window.scrollY / document.body.offsetHeight) * 100
    if (percentage >= 80) {
      callback()
    }
  }, [...updateCallbackUsingDependencies, allowScrollingWhen])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return children
}
