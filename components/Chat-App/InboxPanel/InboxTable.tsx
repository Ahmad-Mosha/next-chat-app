/* eslint-disable no-underscore-dangle */

'use client'

import React from 'react'
import {
  Table,
  TableCaption,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getInvitations } from '@/helpers/api/invitations/getInvitations'
import { createConversation } from '@/helpers/api/conversations/createConversation'

export default function InboxTable() {
  const { data } = useQuery({
    queryKey: ['get-invitations'],
    queryFn: async () => getInvitations(),
  })

  return (
    <Table>
      <TableCaption>A list of your inbox</TableCaption>
      <TableBody>
        {data?.map((invitation) => (
          <TableRow key={invitation._id}>
            <TableCell className="font-medium">
              {invitation.sender.name} is inviting you for a conversations
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-slate-300"
                  asChild={false}
                  onClick={async () => {
                    await createConversation({
                      recipient: invitation.sender.email,
                    })
                  }}
                >
                  <Check color="green" className="w-5 h-5" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-slate-300"
                  asChild={false}
                >
                  <X color="red" className="w-5 h-5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
