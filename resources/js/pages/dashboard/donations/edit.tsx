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

interface Donation {
  id: number
  title: string
  description: string | null
  image: string | null
  goal_amount: number
  raised_amount: number
  category: string | null
  end_date: string | null
  is_active: boolean
  beneficiary_info: string | null
}

interface Props {
  donation: Donation
}

export default function EditDonation({ donation }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    title: donation.title || '',
    description: donation.description || '',
    image: donation.image || '',
    goal_amount: donation.goal_amount?.toString() || '',
    raised_amount: donation.raised_amount?.toString() || '0',
    category: donation.category || '',
    end_date: donation.end_date || '',
    is_active: donation.is_active || false,
    beneficiary_info: donation.beneficiary_info || '',
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(`/admin/donations/${donation.id}`)
  }

  return (
    <>
      <Head title={`Edit ${donation.title} - Admin`} />
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
              <Link href="/admin/donations">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Donation Campaign</h1>
                <p className="text-muted-foreground">Update your donation campaign</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Edit the details of your donation campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter campaign title"
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
                      placeholder="Describe the campaign"
                      rows={5}
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
                      <Label htmlFor="goal_amount">Goal Amount</Label>
                      <Input
                        id="goal_amount"
                        type="number"
                        step="0.01"
                        value={data.goal_amount}
                        onChange={(e) => setData('goal_amount', e.target.value)}
                        placeholder="10000.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="raised_amount">Raised Amount</Label>
                      <Input
                        id="raised_amount"
                        type="number"
                        step="0.01"
                        value={data.raised_amount}
                        onChange={(e) => setData('raised_amount', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="e.g., Education, Healthcare"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficiary_info">Beneficiary Information</Label>
                    <Textarea
                      id="beneficiary_info"
                      value={data.beneficiary_info}
                      onChange={(e) => setData('beneficiary_info', e.target.value)}
                      placeholder="Information about beneficiaries"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Active Campaign</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Campaign'}
                </Button>
                <Link href="/admin/donations">
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
