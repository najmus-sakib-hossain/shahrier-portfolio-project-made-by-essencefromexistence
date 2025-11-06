import { Head, Link, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Trash2, Mail, MailOpen } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  status: string
  created_at: string
  updated_at: string
}

interface Props {
  contacts: {
    data: Contact[]
    links: any[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default function ContactsIndex({ contacts }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this contact message?')) {
      router.delete(`/admin/contacts/${id}`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Head title="Contact Messages - Admin" />
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
                <p className="text-muted-foreground">
                  Manage contact form submissions from your website
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
                <CardDescription>
                  {contacts.total} total message{contacts.total !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.data.length > 0 ? (
                  <div className="space-y-4">
                    {contacts.data.map((contact) => (
                      <div
                        key={contact.id}
                        className={`border rounded-lg p-4 ${
                          !contact.is_read ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {!contact.is_read ? (
                                <Mail className="h-4 w-4 text-blue-600" />
                              ) : (
                                <MailOpen className="h-4 w-4 text-gray-400" />
                              )}
                              <h3 className="font-semibold text-lg">
                                {contact.first_name} {contact.last_name}
                              </h3>
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground mb-3">
                              <p>Email: {contact.email}</p>
                              {contact.phone && <p>Phone: {contact.phone}</p>}
                              <p>
                                Received:{' '}
                                {formatDistanceToNow(new Date(contact.created_at), {
                                  addSuffix: true,
                                })}
                              </p>
                            </div>
                            <p className="text-sm line-clamp-2">{contact.message}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Link href={`/admin/contacts/${contact.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(contact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Pagination */}
                    {contacts.last_page > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-6">
                        {contacts.links.map((link, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant={link.active ? 'default' : 'outline'}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No contact messages yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
