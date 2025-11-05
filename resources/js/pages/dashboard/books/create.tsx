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

export default function CreateBook() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    book_url: '',
    thumbnail: '',
    platform: 'YouTube',
    category: '',
    duration: '',
    is_short: false,
    views: 0,
    published_at: '',
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/books')
  }

  return (
    <>
      <Head title="Create Book - Admin" />
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
              <Link href="/admin/books">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Book</h1>
                <p className="text-muted-foreground">Add a new book to your website</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                  <CardDescription>Enter the details of your book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter book title"
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter book description"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="book_url">Book URL</Label>
                    <Input
                      id="book_url"
                      value={data.book_url}
                      onChange={(e) => setData('book_url', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      value={data.thumbnail}
                      onChange={(e) => setData('thumbnail', e.target.value)}
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Input
                        id="platform"
                        value={data.platform}
                        onChange={(e) => setData('platform', e.target.value)}
                        placeholder="YouTube, Vimeo, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="e.g., Tutorial, Vlog"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (e.g., 10:30)</Label>
                      <Input
                        id="duration"
                        value={data.duration}
                        onChange={(e) => setData('duration', e.target.value)}
                        placeholder="10:30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="views">Views</Label>
                      <Input
                        id="views"
                        type="number"
                        value={data.views}
                        onChange={(e) => setData('views', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="published_at">Publish Date</Label>
                    <Input
                      id="published_at"
                      type="date"
                      value={data.published_at}
                      onChange={(e) => setData('published_at', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_short"
                      checked={data.is_short}
                      onCheckedChange={(checked) => setData('is_short', checked)}
                    />
                    <Label htmlFor="is_short">Short Book (&lt; 60 seconds)</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Book'}
                </Button>
                <Link href="/admin/books">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
