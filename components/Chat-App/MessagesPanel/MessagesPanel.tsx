/* eslint-disable no-underscore-dangle */
import React from 'react'
import type { Conversation } from '@/helpers/types'
import { ConversationMessagesPanel } from './ConversationMessagesPanel'
import { MessagesForm } from './MessagesForm'
import MessagesHeader from './MessagesHeader'

type MessagePanelProps = {
  conversation: Conversation
}
export function MessagesPanel({ conversation }: MessagePanelProps) {
  return (
    <div className="">
      <MessagesHeader conversation={conversation} />
      <div className="flex flex-col h-svh">
        <ConversationMessagesPanel />
        <MessagesForm conversationId={conversation._id} />
      </div>
    </div>
  )
}
