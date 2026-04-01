import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getOrCreateCompanion,
  getStoredChat,
  persistChat,
  resetBuddyState,
} from './adapters/storage'
import { getWelcomeChat } from './domain/companion'
import { generateBuddyReply } from './domain/reply'
import type { BuddyUiState, ChatMessage, Companion } from './domain/types'
import { BuddyCard } from './ui/BuddyCard'
import { BuddySprite } from './ui/BuddySprite'
import { ChatPanel } from './ui/ChatPanel'

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
  }
}

export default function App(): JSX.Element {
  const [companion, setCompanion] = useState<Companion | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [reaction, setReaction] = useState<string | null>(null)
  const [uiState, setUiState] = useState<BuddyUiState>({
    mood: 'idle',
    speaking: false,
    idle: true,
    lastInteractionAt: Date.now(),
  })

  useEffect(() => {
    const nextCompanion = getOrCreateCompanion()
    setCompanion(nextCompanion)
    setMessages(getStoredChat(nextCompanion))
  }, [])

  useEffect(() => {
    if (!reaction) return
    const timer = window.setTimeout(() => setReaction(null), 4000)
    return () => window.clearTimeout(timer)
  }, [reaction])

  const lastAssistantMessage = useMemo(() => {
    const reversed = [...messages].reverse()
    return (
      reversed.find((message) => message.role === 'assistant')?.content ?? null
    )
  }, [messages])

  const sendMessage = useCallback(
    (input: string) => {
      if (!companion) return

      const userMessage = createMessage('user', input)
      const pendingMessages = [...messages, userMessage]

      setMessages(pendingMessages)
      persistChat(pendingMessages)
      setReaction(`${companion.name} gathers a tiny thought...`)
      setUiState({
        mood: 'thinking',
        speaking: true,
        idle: false,
        lastInteractionAt: Date.now(),
      })

      window.setTimeout(() => {
        const reply = generateBuddyReply(input, companion, pendingMessages)
        const assistantMessage = createMessage('assistant', reply.content)
        const nextMessages = [...pendingMessages, assistantMessage]

        setMessages(nextMessages)
        persistChat(nextMessages)
        setReaction(reply.content)
        setUiState({
          mood: reply.mood,
          speaking: true,
          idle: false,
          lastInteractionAt: Date.now(),
        })
      }, 520)
    },
    [companion, messages],
  )

  const petBuddy = useCallback(() => {
    if (!companion) return

    const assistantMessage = createMessage(
      'assistant',
      `${companion.name} leans into the affection and looks unbearably pleased.`,
    )
    const nextMessages = [...messages, assistantMessage]

    setMessages(nextMessages)
    persistChat(nextMessages)
    setReaction(assistantMessage.content)
    setUiState({
      mood: 'happy',
      speaking: true,
      idle: false,
      lastInteractionAt: Date.now(),
    })
  }, [companion, messages])

  const reHatch = useCallback(() => {
    resetBuddyState()

    const nextCompanion = getOrCreateCompanion()
    const welcome = getWelcomeChat(nextCompanion)

    setCompanion(nextCompanion)
    setMessages([welcome])
    persistChat([welcome])
    setReaction(`A new companion hatches. Say hi to ${nextCompanion.name}.`)
    setUiState({
      mood: 'happy',
      speaking: true,
      idle: false,
      lastInteractionAt: Date.now(),
    })
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setUiState((current) => {
        const idleFor = Date.now() - current.lastInteractionAt

        if (idleFor < 5000) {
          return {
            ...current,
            speaking: false,
          }
        }

        return {
          ...current,
          mood: 'idle',
          speaking: false,
          idle: true,
        }
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  if (!companion) {
    return <main className="loading-state">Hatching your buddy...</main>
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Buddy Web</p>
          <h1>
            A tiny terminal companion, grown from the Claude Code Buddy idea.
          </h1>
          <p className="hero-text">
            The default display now leans back toward the original Buddy
            feeling: a small familiar that lives beside the chat box, keeps you
            company, and still sits on top of a longer-term mascot system for
            skins, stages, and future growth.
          </p>
          {lastAssistantMessage ? (
            <p className="last-quote">
              Latest bubble: "{lastAssistantMessage}"
            </p>
          ) : null}
        </div>

        <BuddySprite
          companion={companion}
          mood={uiState.mood}
          reaction={reaction}
          speaking={uiState.speaking}
        />
      </section>

      <section className="content-grid">
        <BuddyCard
          companion={companion}
          onPet={petBuddy}
          onReset={reHatch}
        />
        <ChatPanel messages={messages} onSend={sendMessage} />
      </section>
    </main>
  )
}
