import { Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import ChatMessage from 'src/components/chat-message'
import { llm, createPromptFromMessage } from 'src/langchain/llm'
import { RobotChatMessage } from 'src/models/robot-chat'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import {
  RunnableConfig,
  RunnablePassthrough,
  RunnableSequence,
  RunnableWithMessageHistory,
} from '@langchain/core/runnables'
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import { BaseMessage } from '@langchain/core/messages'

const messageHistories: Record<string, InMemoryChatMessageHistory> = {}

const CHAT_PROMPT_MESSAGE = `
  You are an excellent conversationalist with vast knowledge, 
  capable of discussing topics ranging from astronomy to geography. 
  You are skilled at answering questions clearly and effectively.

  Please answer below user question, and respond with a valid JSON object, containing one field: "answer". Do not wrap the JSON output in markdown blocks.
`
const parser = new JsonOutputParser<{ answer: string }>()
const runnable = RunnableSequence.from<{
  user_input: string
  chat_history: BaseMessage[]
}>([
  RunnablePassthrough.assign({
    chat_history: (input: { chat_history: BaseMessage[] }) =>
      input.chat_history.slice(-10),
  }),
  createPromptFromMessage(CHAT_PROMPT_MESSAGE),
  llm,
  parser,
]).bind({
  response_format: {
    type: 'json_object',
  },
} as unknown as never)

const chain = new RunnableWithMessageHistory({
  runnable,
  getMessageHistory: async (sessionId: string) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory()
    }
    return messageHistories[sessionId]
  },
  inputMessagesKey: 'user_input',
  historyMessagesKey: 'chat_history',
})

export default function RobotChat() {
  const [userInput, setUserInput] = useState('')
  const [messageList, setMessageList] = useState<RobotChatMessage[]>([])
  // eslint-disable-next-line
  const [chatConfig, setChatConfig] = useState<RunnableConfig>({
    configurable: { sessionId: 'initial' },
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = e
    currentTarget.style.height = 'auto'
    currentTarget.style.height = `${currentTarget.scrollHeight + 10}px`
    setUserInput(currentTarget.value)
  }

  const handleKeyBoardAction = (keyEvent: React.KeyboardEvent): void => {
    const { altKey, key } = keyEvent
    // only care about the Enter behavior
    if (key === 'Enter') {
      if (altKey) {
        // new line
        setUserInput(`${userInput}\n`)
      } else {
        // submit request to AI
        sendMessage(userInput)
        // set to message list
        messageList.push({
          message: userInput,
          role: 'user',
        })
        setMessageList([...messageList])
        // clear user input
        setUserInput('')
      }
    }
  }

  const sendMessage = async (input: string): Promise<void> => {
    const responseStream = await chain.stream(
      { user_input: input, chat_history: [] },
      chatConfig
    )
    let currentResponse: RobotChatMessage = { message: '', role: 'assistant' }
    messageList.push(currentResponse)
    for await (const s of responseStream) {
      currentResponse = messageList.splice(-1, 1)[0]
      currentResponse.message = s.answer
      messageList.push(currentResponse)
      setMessageList([...messageList])
    }
  }

  const renderMessageList = (messageList: RobotChatMessage[]): JSX.Element => {
    return (
      <>
        {messageList.map((message, index) => (
          <ChatMessage
            key={`${message.role}-${index}`}
            message={message.message}
            position={message.role === 'assistant' ? 'left' : 'right'}
          ></ChatMessage>
        ))}
      </>
    )
  }

  return (
    <div className="h-full w-full relative">
      <div className="flex flex-col overflow-y-auto p-4">
        {renderMessageList(messageList)}
      </div>
      <div className="absolute bottom-2 left-12 right-12">
        <Textarea
          value={userInput}
          onChange={handleUserInput}
          onKeyUp={handleKeyBoardAction}
          placeholder="How can I help you today"
          size="lg"
        />
      </div>
    </div>
  )
}
