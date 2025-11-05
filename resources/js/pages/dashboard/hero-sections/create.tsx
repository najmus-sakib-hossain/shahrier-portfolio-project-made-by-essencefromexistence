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

export default function CreateHeroSection() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    subtitle: '',
    tagline: '',
    description: '',
    image_url: '',
    social_links: {
      linkedin: '',
      dribbble: '',
      behance: '',
    },
    is_active: true,
    order: 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/hero-sections')
  }

  return (
    <>
      <Head title="Create Hero Section - Admin" />
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
              <Link href="/admin/hero-sections">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Hero Section</h1>
                <p className="text-muted-foreground">Add a new hero section to your homepage</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the details of your hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter hero title"
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={data.subtitle}
                      onChange={(e) => setData('subtitle', e.target.value)}
                      placeholder="Enter subtitle"
                    />
                    {errors.subtitle && (
                      <p className="text-sm text-red-600">{errors.subtitle}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={data.tagline}
                      onChange={(e) => setData('tagline', e.target.value)}
                      placeholder="Enter tagline"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter description"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={data.image_url}
                      onChange={(e) => setData('image_url', e.target.value)}
                      placeholder="/assets/home_banner.png"
                    />
                    <p className="text-xs text-muted-foreground">Enter image path from /assets/ folder</p>
                  </div>

                  <div className="space-y-4">
                    <Label>Social Media Links</Label>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-normal">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        value={data.social_links.linkedin}
                        onChange={(e) => setData('social_links', { ...data.social_links, linkedin: e.target.value })}
                        placeholder="https://www.linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dribbble" className="text-sm font-normal">Dribbble URL</Label>
                      <Input
                        id="dribbble"
                        value={data.social_links.dribbble}
                        onChange={(e) => setData('social_links', { ...data.social_links, dribbble: e.target.value })}
                        placeholder="https://dribbble.com/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="behance" className="text-sm font-normal">Behance URL</Label>
                      <Input
                        id="behance"
                        value={data.social_links.behance}
                        onChange={(e) => setData('social_links', { ...data.social_links, behance: e.target.value })}
                        placeholder="https://www.behance.net/username"
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
                  {processing ? 'Creating...' : 'Create Hero Section'}
                </Button>
                <Link href="/admin/hero-sections">
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
