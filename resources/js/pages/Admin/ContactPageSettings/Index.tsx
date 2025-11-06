import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactPageSetting {
    id: number;
    page_title: string;
    heading: string;
    description: string;
    contact_email: string;
    form_title: string;
    background_image: string | null;
}

interface Props {
    settings: ContactPageSetting;
}

export default function ContactPageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Contact",
        heading: settings?.heading || "Let's talk over a cup of coffee!",
        description: settings?.description || "Ready to elevate your brand with unforgettable experiential events?\n\nWhether you're a brand looking to create a unique brand experience or a creative professional seeking collaboration, we're here to bring your vision to life.",
        contact_email: settings?.contact_email || "mdshahriar.khan@gmail.com",
        form_title: settings?.form_title || "Drop Your Message",
        background_image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/contact-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("background_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Contact Page Settings" />

                <div className="container mx-auto py-8 px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Contact Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content displayed on the Contact page
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>Edit the text and images shown on the contact page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="page_title">Page Title</Label>
                                        <Input
                                            id="page_title"
                                            value={data.page_title}
                                            onChange={(e) => setData("page_title", e.target.value)}
                                            placeholder="Contact"
                                            className="mt-1"
                                        />
                                        {errors.page_title && (
                                            <p className="text-destructive text-sm mt-1">{errors.page_title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="form_title">Form Title</Label>
                                        <Input
                                            id="form_title"
                                            value={data.form_title}
                                            onChange={(e) => setData("form_title", e.target.value)}
                                            placeholder="Drop Your Message"
                                            className="mt-1"
                                        />
                                        {errors.form_title && (
                                            <p className="text-destructive text-sm mt-1">{errors.form_title}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="heading">Heading Text</Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData("heading", e.target.value)}
                                        placeholder="Let's talk over a cup of coffee!"
                                        className="mt-1"
                                    />
                                    {errors.heading && (
                                        <p className="text-destructive text-sm mt-1">{errors.heading}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description Text</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        placeholder="Enter description..."
                                        className="mt-1 min-h-32"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Use line breaks to separate paragraphs
                                    </p>
                                    {errors.description && (
                                        <p className="text-destructive text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="contact_email">Contact Email</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData("contact_email", e.target.value)}
                                        placeholder="email@example.com"
                                        className="mt-1"
                                    />
                                    {errors.contact_email && (
                                        <p className="text-destructive text-sm mt-1">{errors.contact_email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="background_image">Background Image (Optional)</Label>
                                    <Input
                                        id="background_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Leave empty to keep the current background
                                    </p>
                                    {errors.background_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.background_image}</p>
                                    )}
                                    {(previewImage || settings?.background_image) && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">Preview:</p>
                                            <img
                                                src={previewImage || settings.background_image || ''}
                                                alt="Background preview"
                                                className="w-full max-w-2xl h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full md:w-auto">
                                    {processing ? "Saving..." : "Save Settings"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Preview Section */}
                    {/* <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>How your content will appear on the contact page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative p-8 rounded-lg min-h-[400px] overflow-hidden bg-secondary">
                                <div className="absolute inset-0 bg-black/20"></div>
                                
                                <div className="relative z-10">
                                    <h1 className="text-5xl font-semibold text-white text-center mb-12 underline">
                                        {data.page_title}
                                    </h1>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                                        <div className="text-white">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h3 className="text-3xl font-semibold">
                                                    {data.heading}
                                                </h3>
                                            </div>
                                            <p className="whitespace-pre-line mb-8 text-white/90">
                                                {data.description}
                                            </p>
                                            <p className="text-2xl">
                                                <span className="text-3xl font-semibold">Email: </span>
                                                {data.contact_email}
                                            </p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                                {data.form_title}
                                            </h2>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="h-10 bg-muted rounded-md"></div>
                                                    <div className="h-10 bg-muted rounded-md"></div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="h-10 bg-muted rounded-md"></div>
                                                    <div className="h-10 bg-muted rounded-md"></div>
                                                </div>
                                                <div className="h-24 bg-muted rounded-md"></div>
                                                <div className="h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-medium">
                                                    Send
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
