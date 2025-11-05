import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useRef } from "react"
import { Upload } from "lucide-react"

interface Props {
  user: {
    id: number
    name: string
    email: string
    avatar: string | null
  }
}

export default function Profile({ user }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { data, setData, post, processing, errors, progress, reset } = useForm({
    name: user.name,
    email: user.email,
    avatar: null as File | null,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/profile/update', {
      forceFormData: true,
      onSuccess: () => {
        // Reset the avatar field after successful upload
        reset('avatar')
      },
    })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData('avatar', e.target.files[0])
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen items-center justify-center">
          <div className="mx-auto w-full max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information and avatar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                      <Avatar className="h-32 w-32">
                        <AvatarImage 
                          src={data.avatar ? URL.createObjectURL(data.avatar) : (user.avatar || undefined)} 
                          alt={user.name}
                          key={data.avatar ? 'preview' : user.avatar}
                        />
                        <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click to upload new profile picture
                    </p>
                    {errors.avatar && (
                      <p className="text-sm text-destructive">{errors.avatar}</p>
                    )}
                    {progress && (
                      <div className="w-full max-w-xs">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-center mt-1 text-muted-foreground">
                          Uploading... {progress.percentage}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input (Now Editable) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="Your email address"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>
                      {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
