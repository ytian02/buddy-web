import { useState } from 'react'
import type { ChatMessage } from '../domain/types'

type Props = {
  messages: ChatMessage[]
  onSend: (value: string) => void
}

export function ChatPanel({ messages, onSend }: Props): JSX.Element {
  const [draft, setDraft] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = draft.trim()
    if (!value) return
    onSend(value)
    setDraft('')
  }

  return (
    <section className="chat-panel">
      <div className="chat-header">
        <div>
          <p className="eyebrow">Interaction</p>
          <h2>Chat with your buddy</h2>
        </div>
        <p className="chat-tip">
          Try: hello, pet, I am stuck, or say your buddy&apos;s name.
        </p>
      </div>

      <div className="chat-log">
        {messages.map((message) => (
          <article className={`message message-${message.role}`} key={message.id}>
            <span className="message-role">{message.role}</span>
            <p>{message.content}</p>
          </article>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Say something to your buddy..."
          rows={3}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  )
}
