/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendMessageForm } from '@/helpers/lib/formSchemas'
import { useMutation } from '@tanstack/react-query'
import { createMessage } from '@/helpers/api/messages/createMessage'
import { Textarea } from '@/components/ui/textarea'
import { Conversation } from '@/helpers/types'

type MessageFormProps = {
  conversation: Conversation
}
export function MessagesForm({ conversation }: MessageFormProps) {
  const { mutate } = useMutation({
    mutationKey: ['create-message'],
    mutationFn: createMessage,
  })
  const form = useForm<z.infer<typeof SendMessageForm>>({
    resolver: zodResolver(SendMessageForm),
    defaultValues: { message: '' },
  })

  async function onSubmit(value: z.infer<typeof SendMessageForm>) {
    const data = { content: value.message, conversationId: conversation._id }

    mutate(data)
    form.reset()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Form {...form}>
      <form className="rounded-lg w-[70%] mt-auto mx-auto bottom-1 p-3">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="">
                  <Textarea
                    id="message"
                    placeholder="Message"
                    className="resize-none border-0 shadow-none min-h-16 bg-black text-white focus-visible:ring-transparent"
                    {...field}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
