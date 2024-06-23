import React, { useEffect, useRef } from 'react'

export default function useDynamicStrokeLength<
  T extends Element,
>(): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current !== null) {
      const svgElement = ref.current
      if (svgElement) {
        if (!svgElement.classList.contains('dynamic-stroke')) {
          svgElement.classList.add('dynamic-stroke')
        }
        const allPaths = svgElement.querySelectorAll('path')
        allPaths.forEach((p) =>
          p.style.setProperty('--l', `${p.getTotalLength() + 1}`)
        )
      }
    }
  })

  return ref
}
