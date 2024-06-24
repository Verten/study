import { useEffect, useRef } from 'react'

export default function useUnderLine<
  T extends HTMLElement,
>(): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      if (current) {
        current.classList.add(
          'bg-gradient-to-r',
          'from-cyan-500',
          'to-blue-500',
          'bg-[length:0_2px]',
          'bg-no-repeat',
          'bg-right-bottom',
          'transition-[background-size]',
          'duration-500',
          'hover:bg-[length:100%_2px]',
          'hover:bg-left-bottom'
        )
      }
    }
  })

  return ref
}
