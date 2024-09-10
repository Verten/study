import { Box, Flex, Text, Avatar, Divider } from '@chakra-ui/react'

interface Props {
  position: 'left' | 'right'
  message: string
}

export default function ChatMessage(props: Props) {
  const { position, message } = props

  const messagePosition = (
    p: Props['position']
  ): 'justify-start' | 'justify-end' => {
    return p === 'left' ? 'justify-start' : 'justify-end'
  }

  return (
    <>
      <Flex className={`my-4 ${messagePosition(position)}`}>
        {position === 'left' && <Avatar size={'sm'} src="" />}
        <Box borderWidth="1px" borderRadius="lg" className="mx-2 p-2">
          <Text fontSize="md">{message}</Text>
        </Box>
        {position === 'right' && <Avatar size={'sm'} src="" />}
      </Flex>
      <Divider />
    </>
  )
}
