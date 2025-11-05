import { usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { component } = usePage()

  // Generate page title from component name
  const getPageTitle = () => {
    // Extract the last part of the component path
    const parts = component.split('/')
    const lastPart = parts[parts.length - 1]

    // Handle special cases
    if (lastPart === 'dashboard') return 'Dashboard'
    if (lastPart === 'profile') return 'Profile'

    // Convert camelCase or kebab-case to readable format
    return lastPart
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()) // Capitalize first letter of each word
      .trim()
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="default" asChild size="sm" className="hidden sm:flex">
            <a
              href="/dashboard"
            >
              Dashboard
            </a>
          </Button>
          <Button variant="outline" asChild size="sm" className="hidden sm:flex">
            <a
              href="/home"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              Home Page
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
