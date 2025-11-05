import { FormEventHandler } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface Statistic {
  id: number
  label: string
  value: string
  icon: string | null
  order: number
  is_active: boolean
}

interface Props {
  statistic: Statistic
}

export default function EditStatistic({ statistic }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    label: statistic.label || '',
    value: statistic.value || '',
    icon: statistic.icon || '',
    order: statistic.order || 0,
    is_active: statistic.is_active || false,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    put(`/admin/statistics/${statistic.id}`)
  }

  return (
    <>
      <Head title={`Edit ${statistic.label} - Admin`} />
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
              <Link href="/admin/statistics">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Statistic</h1>
                <p className="text-muted-foreground">Update your statistic</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistic Details</CardTitle>
                  <CardDescription>Edit the details of your statistic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      value={data.label}
                      onChange={(e) => setData('label', e.target.value)}
                      placeholder="e.g., Years of Experience"
                      required
                    />
                    {errors.label && (
                      <p className="text-sm text-red-600">{errors.label}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      value={data.value}
                      onChange={(e) => setData('value', e.target.value)}
                      placeholder="e.g., 10+"
                      required
                    />
                    {errors.value && (
                      <p className="text-sm text-red-600">{errors.value}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon (lucide-react name)</Label>
                    <Input
                      id="icon"
                      value={data.icon}
                      onChange={(e) => setData('icon', e.target.value)}
                      placeholder="e.g., Award, TrendingUp"
                    />
                    <p className="text-xs text-muted-foreground">Enter a lucide-react icon name</p>
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
                  {processing ? 'Updating...' : 'Update Statistic'}
                </Button>
                <Link href="/admin/statistics">
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
