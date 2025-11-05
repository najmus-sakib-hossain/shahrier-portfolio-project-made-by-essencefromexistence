"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart showing content activity"

const chartConfig = {
  blogs: {
    label: "Blogs",
    color: "hsl(217, 91%, 60%)", // Bright blue
  },
  videos: {
    label: "Videos",
    color: "hsl(142, 71%, 45%)", // Bright green
  },
  events: {
    label: "Events",
    color: "hsl(271, 81%, 60%)", // Purple
  },
  books: {
    label: "Books",
    color: "hsl(24, 95%, 53%)", // Orange
  },
  donations: {
    label: "Donations",
    color: "hsl(340, 82%, 52%)", // Pink/Red
  },
  awards: {
    label: "Awards",
    color: "hsl(45, 93%, 47%)", // Gold/Yellow
  },
  certificates: {
    label: "Certificates",
    color: "hsl(198, 93%, 60%)", // Cyan
  },
  lifeEvents: {
    label: "Life Events",
    color: "hsl(280, 67%, 60%)", // Magenta
  },
  team: {
    label: "Team Members",
    color: "hsl(160, 60%, 45%)", // Teal
  },
} satisfies ChartConfig

interface ChartData {
  date: string
  blogs: number
  videos: number
  events: number
  books: number
  donations: number
  awards: number
  certificates: number
  lifeEvents: number
  team: number
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const [chartData, setChartData] = React.useState<ChartData[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Fetch data from Laravel backend
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        let days = 90
        if (timeRange === "30d") {
          days = 30
        } else if (timeRange === "7d") {
          days = 7
        }

        const response = await fetch(`/api/activity/visitors?days=${days}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch content activity data')
        }
        
        const result = await response.json()
        
        if (result.success && result.data) {
          setChartData(result.data)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Error fetching chart data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
        // Set empty data on error
        setChartData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  const filteredData = chartData

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Content Activity</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {timeRange === "90d" && "Content created in the last 3 months"}
            {timeRange === "30d" && "Content created in the last 30 days"}
            {timeRange === "7d" && "Content created in the last 7 days"}
          </span>
          <span className="@[540px]/card:hidden">
            {timeRange === "90d" && "Last 3 months"}
            {timeRange === "30d" && "Last 30 days"}
            {timeRange === "7d" && "Last 7 days"}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-destructive">Error: {error}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillBlogs" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-blogs)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-blogs)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillVideos" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-videos)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-videos)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-events)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-events)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillBooks" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-books)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-books)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-donations)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-donations)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillAwards" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-awards)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-awards)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCertificates" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-certificates)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-certificates)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillLifeEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-lifeEvents)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-lifeEvents)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillTeam" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-team)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-team)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                reversed={false}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              {/* Order matters: First Area = bottom of stack (left side), Last Area = top (right side) */}
              <Area
                dataKey="blogs"
                type="natural"
                fill="url(#fillBlogs)"
                stroke="var(--color-blogs)"
                stackId="a"
              />
              <Area
                dataKey="videos"
                type="natural"
                fill="url(#fillVideos)"
                stroke="var(--color-videos)"
                stackId="a"
              />
              <Area
                dataKey="events"
                type="natural"
                fill="url(#fillEvents)"
                stroke="var(--color-events)"
                stackId="a"
              />
              <Area
                dataKey="books"
                type="natural"
                fill="url(#fillBooks)"
                stroke="var(--color-books)"
                stackId="a"
              />
              <Area
                dataKey="donations"
                type="natural"
                fill="url(#fillDonations)"
                stroke="var(--color-donations)"
                stackId="a"
              />
              <Area
                dataKey="awards"
                type="natural"
                fill="url(#fillAwards)"
                stroke="var(--color-awards)"
                stackId="a"
              />
              <Area
                dataKey="certificates"
                type="natural"
                fill="url(#fillCertificates)"
                stroke="var(--color-certificates)"
                stackId="a"
              />
              <Area
                dataKey="lifeEvents"
                type="natural"
                fill="url(#fillLifeEvents)"
                stroke="var(--color-lifeEvents)"
                stackId="a"
              />
              <Area
                dataKey="team"
                type="natural"
                fill="url(#fillTeam)"
                stroke="var(--color-team)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
