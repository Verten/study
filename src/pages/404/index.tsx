import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useUnderLine from 'src/hooks/useUnderLine'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const ref = useUnderLine<HTMLDivElement>()

  return (
    <div className="h-full flex justify-center items-center flex-col">
      <div ref={ref} className="text-6xl">
        Not Found
      </div>
      <div className="mt-4">
        <Button size="md" colorScheme="blue" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  )
}
