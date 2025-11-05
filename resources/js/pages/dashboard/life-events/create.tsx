import { FormEventHandler } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function CreateLifeEvent() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    image: '',
    event_date: '',
    category: '',
    location: '',
    is_featured: false,
    order: 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/life-events')
  }

  return (
    <>
      <Head title="Create Life Event - Admin" />
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
            <div className="flex items-center gap-4">
              <Link href="/admin/life-events">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Life Event</h1>
                <p className="text-muted-foreground">Add a new life event</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Life Event Details</CardTitle>
                  <CardDescription>Enter the details of your life event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter event title"
                      required
                    />
                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Describe the event"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={data.image}
                      onChange={(e) => setData('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event_date">Event Date</Label>
                      <Input
                        id="event_date"
                        type="date"
                        value={data.event_date}
                        onChange={(e) => setData('event_date', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="e.g., Career, Personal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        placeholder="Event location"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order">Display Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={data.is_featured}
                      onCheckedChange={(checked) => setData('is_featured', checked)}
                    />
                    <Label htmlFor="is_featured">Featured Event</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Life Event'}
                </Button>
                <Link href="/admin/life-events">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
