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

interface AboutSection {
  id: number
  type: string
  title: string
  order: number
}

interface Props {
  aboutSections: AboutSection[]
}

export default function AboutSectionsIndex({ aboutSections }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this about section?')) {
      router.delete(`/admin/about-sections/${id}`)
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
              <h1 className="text-3xl font-bold tracking-tight">About Sections</h1>
              <p className="text-muted-foreground">
                Manage your homepage about sections
              </p>
            </div>
            <Link href="/admin/about-sections/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New About Section
              </Button>
            </Link>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aboutSections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No about sections found. Create your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  aboutSections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell className="font-medium">{section.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{section.type}</Badge>
                      </TableCell>
                      <TableCell>{section.order}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/about-sections/${section.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(section.id)}
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
