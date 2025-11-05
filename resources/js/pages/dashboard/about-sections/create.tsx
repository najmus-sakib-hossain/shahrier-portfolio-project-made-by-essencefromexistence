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

export default function CreateAboutSection() {
  const { data, setData, post, processing, errors } = useForm({
    section_type: '',
    title: '',
    content: '',
    image: '',
    additional_data: '',
    order: 0,
    is_active: true,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/about-sections')
  }

  return (
    <>
      <Head title="Create About Section - Admin" />
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
              <Link href="/admin/about-sections">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create About Section</h1>
                <p className="text-muted-foreground">Add a new about section</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Section Details</CardTitle>
                  <CardDescription>Enter the details of your about section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="section_type">Section Type</Label>
                    <Input
                      id="section_type"
                      value={data.section_type}
                      onChange={(e) => setData('section_type', e.target.value)}
                      placeholder="e.g., story, impact, travel"
                      required
                    />
                    {errors.section_type && <p className="text-sm text-red-600">{errors.section_type}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter section title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={data.content}
                      onChange={(e) => setData('content', e.target.value)}
                      placeholder="Enter content"
                      rows={6}
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

                  <div className="space-y-2">
                    <Label htmlFor="additional_data">Additional Data (JSON)</Label>
                    <Textarea
                      id="additional_data"
                      value={data.additional_data}
                      onChange={(e) => setData('additional_data', e.target.value)}
                      placeholder='{"key": "value"}'
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Optional JSON data</p>
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
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={(checked) => setData('is_active', checked)}
                      />
                      <Label htmlFor="is_active">Active</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Section'}
                </Button>
                <Link href="/admin/about-sections">
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
