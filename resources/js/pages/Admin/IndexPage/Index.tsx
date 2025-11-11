import { useState, FormEvent } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical, ImageIcon } from "lucide-react";

interface Logo {
    id: number;
    name: string;
    logo_path: string;
    display_order: number;
    is_active: boolean;
}

interface IndexPage {
    id: number;
    title_text: string;
    hero_image: string;
    button_text: string;
    button_link: string;
    is_active: boolean;
    logos: Logo[];
}

interface Props {
    indexPage: IndexPage;
}

export default function IndexPageManagement({ indexPage }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [editingLogo, setEditingLogo] = useState<Logo | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title_text: indexPage?.title_text || "SHAHRIAR",
        button_text: indexPage?.button_text || "Play Now",
        button_link: indexPage?.button_link || "/home",
        hero_image: null as File | null,
        is_active: indexPage?.is_active ?? true,
    });

    const logoForm = useForm({
        name: "",
        logo_path: null as File | null,
        display_order: indexPage?.logos?.length ? indexPage.logos.length + 1 : 1,
        is_active: true,
    });

    const editLogoForm = useForm({
        name: "",
        logo_path: null as File | null,
        display_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/index-page/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
            },
            onError: (errors: any) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("hero_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('Logo file selected:', file);
        if (file) {
            console.log('File details:', {
                name: file.name,
                size: file.size,
                type: file.type,
            });
            logoForm.setData("logo_path", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                console.log('Preview generated successfully');
            };
            reader.readAsDataURL(file);
        } else {
            console.error('No file selected!');
        }
    };

    const handleEditLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editLogoForm.setData("logo_path", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddLogo = (e: FormEvent) => {
        e.preventDefault();
        
        // Debug: Log form data
        console.log('Submitting logo with data:', {
            name: logoForm.data.name,
            display_order: logoForm.data.display_order,
            is_active: logoForm.data.is_active,
            has_file: logoForm.data.logo_path !== null,
            file_info: logoForm.data.logo_path ? {
                name: logoForm.data.logo_path.name,
                size: logoForm.data.logo_path.size,
                type: logoForm.data.logo_path.type,
            } : null
        });

        // Manually create FormData to ensure file is properly sent
        const formData = new FormData();
        formData.append('name', logoForm.data.name);
        formData.append('display_order', logoForm.data.display_order.toString());
        formData.append('is_active', logoForm.data.is_active ? '1' : '0');
        
        if (logoForm.data.logo_path) {
            formData.append('logo_path', logoForm.data.logo_path);
            console.log('File appended to FormData:', logoForm.data.logo_path.name);
        } else {
            console.error('No file to append!');
            return;
        }

        // Debug: Log FormData contents
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ', pair[1]);
        }

        // Use native fetch to bypass Inertia's FormData handling issues
        fetch("/admin/index-page/logos", {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw data;
                });
            }
            return response.json();
        })
        .then(() => {
            logoForm.reset();
            setLogoPreview(null);
            console.log('Logo added successfully!');
            // Reload the page to show new logo
            window.location.reload();
        })
        .catch((errors: any) => {
            console.error('Logo add errors:', errors);
            console.error('Error details:', JSON.stringify(errors, null, 2));
            // Display a user-friendly alert with the error
            if (errors && typeof errors === 'object') {
                if (errors.errors) {
                    const errorMessages = Object.entries(errors.errors)
                        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                        .join('\n');
                    alert('Failed to add logo:\n\n' + errorMessages);
                } else if (errors.message) {
                    alert('Error: ' + errors.message);
                }
            }
        });
    };

    const handleUpdateLogo = (e: FormEvent) => {
        e.preventDefault();
        if (editingLogo) {
            // Manually create FormData to ensure file is properly sent
            const formData = new FormData();
            formData.append('name', editLogoForm.data.name);
            formData.append('display_order', editLogoForm.data.display_order.toString());
            formData.append('is_active', editLogoForm.data.is_active ? '1' : '0');
            
            if (editLogoForm.data.logo_path) {
                formData.append('logo_path', editLogoForm.data.logo_path);
                console.log('File appended to FormData for update:', editLogoForm.data.logo_path.name);
            }

            // Use native fetch to bypass Inertia's FormData handling issues
            fetch(`/admin/index-page/logos/${editingLogo.id}/update`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw data;
                    });
                }
                return response.json();
            })
            .then(() => {
                editLogoForm.reset();
                setLogoPreview(null);
                setEditingLogo(null);
                console.log('Logo updated successfully!');
                // Reload the page to show updated logo
                window.location.reload();
            })
            .catch((errors: any) => {
                console.error('Logo update errors:', errors);
                console.error('Error details:', JSON.stringify(errors, null, 2));
                if (errors && typeof errors === 'object') {
                    if (errors.errors) {
                        const errorMessages = Object.entries(errors.errors)
                            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                            .join('\n');
                        alert('Failed to update logo:\n\n' + errorMessages);
                    } else if (errors.message) {
                        alert('Error: ' + errors.message);
                    }
                }
            });
        }
    };

    const handleDeleteLogo = (logoId: number) => {
        if (confirm("Are you sure you want to delete this logo?")) {
            router.delete(`/admin/index-page/logos/${logoId}`);
        }
    };

    const startEditLogo = (logo: Logo) => {
        setEditingLogo(logo);
        editLogoForm.setData({
            name: logo.name,
            logo_path: null,
            display_order: logo.display_order,
            is_active: logo.is_active,
        });
        setLogoPreview(null);
    };

    const cancelEdit = () => {
        setEditingLogo(null);
        editLogoForm.reset();
        setLogoPreview(null);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Index Page Management" />

                <div className="container mx-auto py-8 px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Landing Page Settings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage the main landing page (Index) content and logos
                        </p>
                    </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Main Settings Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Settings</CardTitle>
                            <CardDescription>Configure the main landing page content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title_text">Title Text</Label>
                                    <Input
                                        id="title_text"
                                        value={data.title_text}
                                        onChange={(e) => setData("title_text", e.target.value)}
                                        placeholder="SHAHRIAR"
                                        className="mt-1"
                                    />
                                    {errors.title_text && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title_text}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="button_text">Button Text</Label>
                                    <Input
                                        id="button_text"
                                        value={data.button_text}
                                        onChange={(e) => setData("button_text", e.target.value)}
                                        placeholder="Play Now"
                                        className="mt-1"
                                    />
                                    {errors.button_text && (
                                        <p className="text-red-500 text-sm mt-1">{errors.button_text}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="button_link">Button Link</Label>
                                    <Input
                                        id="button_link"
                                        value={data.button_link}
                                        onChange={(e) => setData("button_link", e.target.value)}
                                        placeholder="/home"
                                        className="mt-1"
                                    />
                                    {errors.button_link && (
                                        <p className="text-red-500 text-sm mt-1">{errors.button_link}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="hero_image">Hero Image</Label>
                                    <Input
                                        id="hero_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    {errors.hero_image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.hero_image}</p>
                                    )}
                                    {(previewImage || indexPage?.hero_image) && (
                                        <div className="mt-4">
                                            <img
                                                src={previewImage || indexPage.hero_image}
                                                alt="Hero preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData("is_active", e.target.checked)}
                                        className="rounded"
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? "Saving..." : "Save Settings"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Add/Edit Logo Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingLogo ? "Edit Logo" : "Add New Logo"}</CardTitle>
                            <CardDescription>
                                {editingLogo ? "Update existing logo" : "Add a new logo to the landing page"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={editingLogo ? handleUpdateLogo : handleAddLogo} className="space-y-4">
                                <div>
                                    <Label htmlFor="logo_name">Logo Name</Label>
                                    <Input
                                        id="logo_name"
                                        value={editingLogo ? editLogoForm.data.name : logoForm.data.name}
                                        onChange={(e) =>
                                            editingLogo
                                                ? editLogoForm.setData("name", e.target.value)
                                                : logoForm.setData("name", e.target.value)
                                        }
                                        placeholder="Company Name"
                                        className="mt-1"
                                        required
                                    />
                                    {(editingLogo ? editLogoForm.errors.name : logoForm.errors.name) && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {editingLogo ? editLogoForm.errors.name : logoForm.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="logo_file">Logo Image</Label>
                                    <Input
                                        id="logo_file"
                                        type="file"
                                        accept="image/*"
                                        onChange={editingLogo ? handleEditLogoChange : handleLogoChange}
                                        className="mt-1"
                                        required={!editingLogo}
                                    />
                                    {(editingLogo ? editLogoForm.errors.logo_path : logoForm.errors.logo_path) && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {editingLogo ? editLogoForm.errors.logo_path : logoForm.errors.logo_path}
                                        </p>
                                    )}
                                    {(logoPreview || (editingLogo && !logoPreview)) && (
                                        <div className="mt-4">
                                            <img
                                                src={logoPreview || (editingLogo?.logo_path || "")}
                                                alt="Logo preview"
                                                className="w-32 h-16 object-contain bg-gray-100 rounded p-2"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="display_order">Display Order</Label>
                                    <Input
                                        id="display_order"
                                        type="number"
                                        value={editingLogo ? editLogoForm.data.display_order : logoForm.data.display_order}
                                        onChange={(e) =>
                                            editingLogo
                                                ? editLogoForm.setData("display_order", parseInt(e.target.value))
                                                : logoForm.setData("display_order", parseInt(e.target.value))
                                        }
                                        className="mt-1"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="logo_active"
                                        checked={editingLogo ? editLogoForm.data.is_active : logoForm.data.is_active}
                                        onChange={(e) =>
                                            editingLogo
                                                ? editLogoForm.setData("is_active", e.target.checked)
                                                : logoForm.setData("is_active", e.target.checked)
                                        }
                                        className="rounded"
                                    />
                                    <Label htmlFor="logo_active">Active</Label>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        disabled={editingLogo ? editLogoForm.processing : logoForm.processing}
                                        className="flex-1"
                                    >
                                        {editingLogo ? "Update Logo" : "Add Logo"}
                                    </Button>
                                    {editingLogo && (
                                        <Button type="button" variant="outline" onClick={cancelEdit}>
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Logos List */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Current Logos</CardTitle>
                        <CardDescription>Manage all logos displayed on the landing page</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {indexPage?.logos && indexPage.logos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {indexPage.logos.map((logo) => (
                                    <div
                                        key={logo.id}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                #{logo.display_order}
                                            </span>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => startEditLogo(logo)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteLogo(logo.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 mb-2">
                                            <img
                                                src={logo.logo_path}
                                                alt={logo.name}
                                                className="w-full h-16 object-contain"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {logo.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {logo.is_active ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No logos added yet. Add your first logo above.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </SidebarInset>
    </SidebarProvider>
    );
}
