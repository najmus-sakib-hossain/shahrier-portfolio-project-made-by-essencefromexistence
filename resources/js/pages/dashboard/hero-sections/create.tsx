import { FormEventHandler, useState } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'

export default function CreateHeroSection() {
  const [socialLinkSettings, setSocialLinkSettings] = useState([
    { platform: 'linkedin', label: 'LinkedIn', is_active: true },
    { platform: 'dribbble', label: 'Dribbble', is_active: true },
    { platform: 'behance', label: 'Behance', is_active: true },
  ])

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    subtitle: '',
    subtitle_max_length: 200,
    tagline: '',
    tagline_max_length: 50,
    description: '',
    description_max_length: 150,
    image_url: '',
    social_links: {
      linkedin: '',
      dribbble: '',
      behance: '',
    },
    social_link_settings: socialLinkSettings,
    font_settings: {
      subtitle_size: 'text-4xl lg:text-6xl',
      tagline_size: 'text-3xl',
      description_size: 'text-4xl lg:text-6xl',
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
                    <Textarea
                      id="subtitle"
                      value={data.subtitle}
                      onChange={(e) => setData('subtitle', e.target.value)}
                      placeholder="Enter subtitle"
                      rows={2}
                      maxLength={data.subtitle_max_length}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{data.subtitle.length} / {data.subtitle_max_length} characters</span>
                      <Input
                        type="number"
                        min="50"
                        max="500"
                        value={data.subtitle_max_length}
                        onChange={(e) => setData('subtitle_max_length', parseInt(e.target.value) || 200)}
                        className="w-20 h-6 text-xs"
                      />
                    </div>
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
                      maxLength={data.tagline_max_length}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{data.tagline.length} / {data.tagline_max_length} characters</span>
                      <Input
                        type="number"
                        min="20"
                        max="100"
                        value={data.tagline_max_length}
                        onChange={(e) => setData('tagline_max_length', parseInt(e.target.value) || 50)}
                        className="w-20 h-6 text-xs"
                      />
                    </div>
                    {errors.tagline && (
                      <p className="text-sm text-red-600">{errors.tagline}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter description"
                      rows={3}
                      maxLength={data.description_max_length}
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{data.description.length} / {data.description_max_length} characters</span>
                      <Input
                        type="number"
                        min="50"
                        max="300"
                        value={data.description_max_length}
                        onChange={(e) => setData('description_max_length', parseInt(e.target.value) || 150)}
                        className="w-20 h-6 text-xs"
                      />
                    </div>
                    {errors.description && (
                      <p className="text-sm text-red-600">{errors.description}</p>
                    )}
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
                    <Label>Social Media Links & URLs</Label>
                    
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

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Display Settings</CardTitle>
                  <CardDescription>Control which social links are shown and customize their labels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinkSettings.map((link, index) => (
                    <div key={link.platform} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Switch
                        checked={link.is_active}
                        onCheckedChange={(checked) => {
                          const newSettings = [...socialLinkSettings]
                          newSettings[index].is_active = checked
                          setSocialLinkSettings(newSettings)
                          setData('social_link_settings', newSettings)
                        }}
                      />
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm font-medium capitalize">{link.platform}</Label>
                        <Input
                          value={link.label}
                          onChange={(e) => {
                            const newSettings = [...socialLinkSettings]
                            newSettings[index].label = e.target.value
                            setSocialLinkSettings(newSettings)
                            setData('social_link_settings', newSettings)
                          }}
                          placeholder={`Display name for ${link.platform}`}
                          maxLength={50}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Font Size Settings</CardTitle>
                  <CardDescription>Choose the font sizes for different text elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subtitle_size">Subtitle Font Size</Label>
                    <Select
                      value={data.font_settings.subtitle_size}
                      onValueChange={(value) => setData('font_settings', { ...data.font_settings, subtitle_size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-2xl lg:text-4xl">Small (2xl/4xl)</SelectItem>
                        <SelectItem value="text-3xl lg:text-5xl">Medium (3xl/5xl)</SelectItem>
                        <SelectItem value="text-4xl lg:text-6xl">Large (4xl/6xl) - Default</SelectItem>
                        <SelectItem value="text-5xl lg:text-7xl">Extra Large (5xl/7xl)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline_size">Tagline Font Size</Label>
                    <Select
                      value={data.font_settings.tagline_size}
                      onValueChange={(value) => setData('font_settings', { ...data.font_settings, tagline_size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-xl">Small (xl)</SelectItem>
                        <SelectItem value="text-2xl">Medium (2xl)</SelectItem>
                        <SelectItem value="text-3xl">Large (3xl) - Default</SelectItem>
                        <SelectItem value="text-4xl">Extra Large (4xl)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_size">Description Font Size</Label>
                    <Select
                      value={data.font_settings.description_size}
                      onValueChange={(value) => setData('font_settings', { ...data.font_settings, description_size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-2xl lg:text-4xl">Small (2xl/4xl)</SelectItem>
                        <SelectItem value="text-3xl lg:text-5xl">Medium (3xl/5xl)</SelectItem>
                        <SelectItem value="text-4xl lg:text-6xl">Large (4xl/6xl) - Default</SelectItem>
                        <SelectItem value="text-5xl lg:text-7xl">Extra Large (5xl/7xl)</SelectItem>
                      </SelectContent>
                    </Select>
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
