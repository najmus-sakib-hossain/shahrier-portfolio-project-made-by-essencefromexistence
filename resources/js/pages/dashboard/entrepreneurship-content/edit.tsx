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

interface EntrepreneurshipContent {
  id: number
  type: string
  title: string
  content: string
  image: string | null
  author: string | null
  publish_date: string
  is_featured: boolean
  order: number
}

interface Props {
  content: EntrepreneurshipContent
}

export default function EditEntrepreneurshipContent({ content }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    type: content.type || '',
    title: content.title || '',
    content: content.content || '',
    image: content.image || '',
    author: content.author || '',
    publish_date: content.publish_date || '',
    is_featured: content.is_featured || false,
    order: content.order || 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(`/admin/entrepreneurship-content/${content.id}`)
  }

  return (
    <>
      <Head title={`Edit ${content.title} - Admin`} />
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
              <Link href="/admin/entrepreneurship-content">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Entrepreneurship Content</h1>
                <p className="text-muted-foreground">Update your entrepreneurship content</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Details</CardTitle>
                  <CardDescription>Edit the details of your entrepreneurship content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={data.type}
                      onChange={(e) => setData('type', e.target.value)}
                      placeholder="e.g., blog, quote, event, innovation"
                      required
                    />
                    {errors.type && (
                      <p className="text-sm text-red-600">{errors.type}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter content title"
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="Enter content"
                      rows={6}
                      required
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
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={data.author}
                        onChange={(e) => setData('author', e.target.value)}
                        placeholder="Author name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="publish_date">Publish Date</Label>
                      <Input
                        id="publish_date"
                        type="date"
                        value={data.publish_date}
                        onChange={(e) => setData('publish_date', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="order">Display Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id="is_featured"
                        checked={data.is_featured}
                        onCheckedChange={(checked) => setData('is_featured', checked)}
                      />
                      <Label htmlFor="is_featured">Featured</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Content'}
                </Button>
                <Link href="/admin/entrepreneurship-content">
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
