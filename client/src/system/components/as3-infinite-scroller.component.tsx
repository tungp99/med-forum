import {
  DependencyList,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'

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
  const [scrolling, setScrolling] = useState(false)

  const handleScroll = useCallback(() => {
    if (!allowScrollingWhen) {
      setScrolling(false)
      return
    }

    const percentage =
      (window.innerHeight + window.scrollY / document.body.offsetHeight) * 100
    if (percentage >= 70) {
      !scrolling && callback()
      setScrolling(true)
    }
  }, [...updateCallbackUsingDependencies, allowScrollingWhen, scrolling])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return children
}
