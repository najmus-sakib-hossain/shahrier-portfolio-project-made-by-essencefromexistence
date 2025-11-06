"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Team {
  id: number
  name: string
  slug: string
  logo: string | null
  plan: string
}

export function TeamSwitcher({
  teams,
}: {
  teams: Team[]
}) {
  const activeTeam = teams[0]

  if (!activeTeam || teams.length === 0) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={activeTeam.logo || undefined} alt={activeTeam.name} />
            <AvatarFallback className="rounded-lg">{getInitials(activeTeam.name)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
