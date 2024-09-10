import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'

const llm = new ChatOpenAI({
  model: 'deepseek-chat',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  configuration: {
    baseURL: 'https://api.deepseek.com',
  },
})

const createPromptFromTemplate = (
  promptTemplate: string
): ChatPromptTemplate => {
  return ChatPromptTemplate.fromTemplate(promptTemplate)
}

const createPromptFromMessage = (systemMessage: string): ChatPromptTemplate => {
  return ChatPromptTemplate.fromMessages([
    ['system', `${systemMessage}`],
    ['placeholder', '{chat_history}'],
    ['human', '{user_input}'],
  ])
}

export { llm, createPromptFromTemplate, createPromptFromMessage }
