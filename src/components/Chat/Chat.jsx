import ChatBot from "react-chatbotify"
import { Ollama } from 'ollama/browser'

export const Chat = () => {
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })
  const run = async(prompt) => {
    const output = await ollama.generate({
      model: 'llama3.2:1b',
      prompt: prompt,
    })
    return output.response
  }

  const themes = [
    {id: "minimal_midnight", version: "0.1.0"},
    {id: "simple_blue", version: "0.1.0"}
  ]

  const flow = {
    start: {
        message: () => {
                return `Welcome back! Where are you looking to travel?`
            },
      path: "chat_loop",
    },
    chat_loop: {
      message: (params) => {
        return run(params.userInput)
      },
      path: "chat_loop"
    },
    }
  return (
    <ChatBot flow={flow} themes={themes} />
  )
} 