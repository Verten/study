import { Button } from '@chakra-ui/react'
import { useNavigate, useRouteError } from 'react-router-dom'
import useUnderLine from 'src/hooks/useUnderLine'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const error = useRouteError() as { statusText: string; message: string }
  const ref = useUnderLine<HTMLDivElement>()
  const errorInfoRef = useUnderLine<HTMLDivElement>()

  return (
    <div className="h-full flex justify-center items-center flex-col">
      <div ref={ref} className="text-6xl">
        Opps!
      </div>
      <p ref={errorInfoRef} className="my-4">
        An unexpected error has occurred.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="mt-4">
        <Button size="md" colorScheme="blue" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  )
}
