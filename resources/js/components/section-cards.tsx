import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { BookOpen, Newspaper, Calendar, Video, Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  stats: {
    total_blogs: number
    total_books: number
    total_events: number
    total_videos: number
    total_donations: number
    blogs_change: number
    books_change: number
    events_change: number
    videos_change: number
    donations_change: number
  }
}

export function SectionCards({ stats }: SectionCardsProps) {
  const cards = [
    {
      title: "Blogs",
      value: stats.total_blogs,
      change: stats.blogs_change,
      icon: Newspaper,
    },
    {
      title: "Books",
      value: stats.total_books,
      change: stats.books_change,
      icon: BookOpen,
    },
    {
      title: "Events",
      value: stats.total_events,
      change: stats.events_change,
      icon: Calendar,
    },
    {
      title: "Videos",
      value: stats.total_videos,
      change: stats.videos_change,
      icon: Video,
    },
    {
      title: "Donations",
      value: stats.total_donations,
      change: stats.donations_change,
      icon: Heart,
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon
        const isPositive = card.change >= 0
        
        return (
          <Card key={index} className="@container/card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{card.title}</CardDescription>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {isPositive ? <IconTrendingUp className="size-3" /> : <IconTrendingDown className="size-3" />}
                  {isPositive ? '+' : ''}{card.change}%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
