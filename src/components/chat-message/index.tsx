import { Box, Flex, Avatar, Divider } from '@chakra-ui/react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

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
          <Markdown
            remarkPlugins={[remarkGfm]}
            children={message}
            components={{
              code(props) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { children, ref, className, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <>
                    <div className="flex justify-between -mb-2 mt-1 px-2 bg-cyan-900">
                      <span>{match[1]}</span>
                      <span className="cursor-pointer">Copy</span>
                    </div>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={materialDark}
                    />
                  </>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          />
        </Box>
        {position === 'right' && <Avatar size={'sm'} src="" />}
      </Flex>
      <Divider />
    </>
  )
}
