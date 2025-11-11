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
import { ArrowLeft } from 'lucide-react'

export default function CreateBook() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    author: '',
    cover_image: null as File | null,
    description: '',
    summary: '',
    highlights: '',
    review: '',
    rating: 0,
    isbn: '',
    read_date: '',
    is_recommended: false,
    order: 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/admin/books', {
      forceFormData: true,
      onSuccess: () => {
        setPreviewImage(null)
      },
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setData('cover_image', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={data.author}
                      onChange={(e) => setData('author', e.target.value)}
                      placeholder="Enter author name"
                    />
                    {errors.author && (
                      <p className="text-sm text-red-600">{errors.author}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover_image">Cover Image</Label>
                    <Input
                      id="cover_image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {errors.cover_image && (
                      <p className="text-sm text-red-600">{errors.cover_image}</p>
                    )}
                    {previewImage && (
                      <div className="mt-4">
                        <img
                          src={previewImage}
                          alt="Cover preview"
                          className="w-48 h-64 object-cover rounded-lg"
                        />
                      </div>
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
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={data.summary}
                      onChange={(e) => setData('summary', e.target.value)}
                      placeholder="Enter book summary"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highlights">Highlights</Label>
                    <Textarea
                      id="highlights"
                      value={data.highlights}
                      onChange={(e) => setData('highlights', e.target.value)}
                      placeholder="Enter key highlights from the book"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review">Review</Label>
                    <Textarea
                      id="review"
                      value={data.review}
                      onChange={(e) => setData('review', e.target.value)}
                      placeholder="Enter your review"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        value={data.rating}
                        onChange={(e) => setData('rating', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={data.isbn}
                        onChange={(e) => setData('isbn', e.target.value)}
                        placeholder="Enter ISBN"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="read_date">Read Date</Label>
                      <Input
                        id="read_date"
                        type="date"
                        value={data.read_date}
                        onChange={(e) => setData('read_date', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order">Display Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_recommended"
                      checked={data.is_recommended}
                      onCheckedChange={(checked) => setData('is_recommended', checked)}
                    />
                    <Label htmlFor="is_recommended">Recommended Book</Label>
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
