import { Head } from "@inertiajs/react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { RecentActivityTable } from "@/components/recent-activity-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface DashboardStats {
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

interface Activity {
  id: number
  resource: string
  action: string
  title: string
  date: string
  user: string
}

interface DashboardProps {
  stats: DashboardStats
  recentActivity: Activity[]
}

export default function Page({ stats, recentActivity }: DashboardProps) {
  // Log data for debugging
  console.log('Dashboard Data:', { stats, recentActivity })
  
  return (
    <>
      <Head title="Dashboard" />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards stats={stats} />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <div className="px-4 lg:px-6">
                  <RecentActivityTable data={recentActivity} />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
