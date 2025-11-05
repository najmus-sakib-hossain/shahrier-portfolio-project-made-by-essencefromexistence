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

interface Donation {
  id: number
  title: string
  goal_amount: number
  raised_amount: number
  currency: string
  is_active: boolean
  end_date: string
}

interface Props {
  donations: Donation[]
}

export default function DonationsIndex({ donations }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      router.delete(`/admin/donations/${id}`)
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
              <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
              <p className="text-muted-foreground">
                Manage your homepage donation campaigns
              </p>
            </div>
            <Link href="/admin/donations/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Donation
              </Button>
            </Link>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Raised</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No donations found. Create your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  donations.map((donation) => {
                    const progress = (donation.raised_amount / donation.goal_amount) * 100
                    return (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.title}</TableCell>
                        <TableCell>{donation.currency} {donation.goal_amount.toLocaleString()}</TableCell>
                        <TableCell>{donation.currency} {donation.raised_amount.toLocaleString()}</TableCell>
                        <TableCell>{progress.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge variant={donation.is_active ? 'default' : 'secondary'}>
                            {donation.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/donations/${donation.id}/edit`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(donation.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
