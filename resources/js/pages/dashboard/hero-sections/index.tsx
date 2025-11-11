import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus, Pencil, Trash2 } from 'lucide-react'

interface HeroSection {
  id: number
  title: string
  subtitle: string
  description: string
  is_active: boolean
  order: number
}

interface Props {
  heroSections: HeroSection[]
}

export default function HeroSectionsIndex({ heroSections }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this hero section?')) {
      router.delete(`/admin/hero-sections/${id}`)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hero Sections</h1>
              <p className="text-muted-foreground">
                Manage your homepage hero sections
              </p>
            </div>
            <Link href="/admin/hero-sections/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Hero Section
              </Button>
            </Link>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroSections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No hero sections found. Create your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  heroSections.map((hero) => (
                    <TableRow key={hero.id}>
                      <TableCell className="font-medium">{hero.title}</TableCell>
                      <TableCell>{hero.subtitle}</TableCell>
                      <TableCell>{hero.description}</TableCell>
                      <TableCell>
                        <Badge variant={hero.is_active ? 'default' : 'secondary'}>
                          {hero.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{hero.order}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/hero-sections/${hero.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(hero.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
