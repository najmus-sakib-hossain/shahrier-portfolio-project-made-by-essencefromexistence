"use client"

import * as React from "react"
import {
  Home,
  BookOpen,
  Newspaper,
  Calendar,
  Video,
  Cpu,
  Heart,
  Sparkles,
  Award,
  User,
  Briefcase,
  BarChart3,
  Layout,
  GalleryVerticalEnd,
  MessageSquare,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  teams: [
    {
      name: "Shahrier Portfolio",
      logo: "/assets/about_me/about_me_banner.png",
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Content Management",
      url: "#",
      icon: Layout,
      isActive: true,
      items: [
        {
          title: "Landing Page",
          url: "/admin/index-page",
        },
        {
          title: "Hero Sections",
          url: "/admin/hero-sections",
        },
        {
          title: "Statistics",
          url: "/admin/statistics",
        },
      ],
    },
    {
      title: "Blog & Articles",
      url: "#",
      icon: Newspaper,
      items: [
        {
          title: "All Blog Posts",
          url: "/admin/blogs",
        },
        {
          title: "Create New Post",
          url: "/admin/blogs/create",
        },
      ],
    },
    {
      title: "Books",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Books",
          url: "/admin/books",
        },
        {
          title: "Add New Book",
          url: "/admin/books/create",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "All Events",
          url: "/admin/events",
        },
        {
          title: "Create Event",
          url: "/admin/events/create",
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: Video,
      items: [
        {
          title: "All Videos",
          url: "/admin/videos",
        },
        {
          title: "Add Video",
          url: "/admin/videos/create",
        },
      ],
    },
    {
      title: "Technology",
      url: "#",
      icon: Cpu,
      items: [
        {
          title: "All Technologies",
          url: "/admin/technologies",
        },
        {
          title: "Add Technology",
          url: "/admin/technologies/create",
        },
      ],
    },
    {
      title: "Donations",
      url: "#",
      icon: Heart,
      items: [
        {
          title: "All Donations",
          url: "/admin/donations",
        },
        {
          title: "Create Donation",
          url: "/admin/donations/create",
        },
      ],
    },
    {
      title: "Life Events",
      url: "#",
      icon: Sparkles,
      items: [
        {
          title: "All Life Events",
          url: "/admin/life-events",
        },
        {
          title: "Add Life Event",
          url: "/admin/life-events/create",
        },
      ],
    },
    {
      title: "About Me",
      url: "#",
      icon: User,
      items: [
        {
          title: "About Sections",
          url: "/admin/about-sections",
        },
        {
          title: "Awards",
          url: "/admin/awards",
        },
        {
          title: "Certificates",
          url: "/admin/certificates",
        },
      ],
    },
    {
      title: "Entrepreneurship",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "All Content",
          url: "/admin/entrepreneurship-content",
        },
        {
          title: "Add Content",
          url: "/admin/entrepreneurship-content/create",
        },
      ],
    },
    {
      title: "Contact Messages",
      url: "/admin/contact-page-settings",
      icon: MessageSquare,
      items: [
        {
          title: "Page Settings",
          url: "/admin/contact-page-settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Frontend Pages",
      url: "/",
      icon: Home,
    },
    {
      name: "Analytics",
      url: "#",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get shared props from Inertia
  const page = usePage()
  const auth = (page.props as any).auth
  const userTeams = (page.props as any).userTeams || []

  const sidebarUser = {
    name: auth?.user?.name || "Guest",
    email: auth?.user?.email || "",
    avatar: auth?.user?.avatar || null,
  }

  // Always show at least the default team
  const teamsToShow = userTeams.length > 0 ? userTeams : data.teams

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teamsToShow} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
