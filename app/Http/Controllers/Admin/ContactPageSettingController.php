<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactPageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactPageSettingController extends Controller
{
    /**
     * Display and edit the contact page settings.
     */
    public function index()
    {
        $settings = ContactPageSetting::first();
        
        if (!$settings) {
            $settings = ContactPageSetting::create([
                'page_title' => 'Contact',
                'heading' => "Let's talk over a cup of coffee!",
                'description' => "Ready to elevate your brand with unforgettable experiential events?\n\nWhether you're a brand looking to create a unique brand experience or a creative professional seeking collaboration, we're here to bring your vision to life.",
                'contact_email' => 'mdshahriar.khan@gmail.com',
                'form_title' => 'Drop Your Message',
            ]);
        }

        return Inertia::render('Admin/ContactPageSettings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the contact page settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_title' => 'required|string|max:255',
            'heading' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'contact_email' => 'required|email|max:255',
            'form_title' => 'required|string|max:255',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $settings = ContactPageSetting::first();
        
        if (!$settings) {
            $settings = new ContactPageSetting();
        }

        // Handle background image upload
        if ($request->hasFile('background_image')) {
            // Delete old image if exists and not a default asset
            if ($settings->background_image && 
                !str_starts_with($settings->background_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $settings->background_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->background_image));
            }

            $path = $request->file('background_image')->store('contact-page', 'public');
            $validated['background_image'] = '/storage/' . $path;
        } else {
            // Don't update background_image if no new file is uploaded
            unset($validated['background_image']);
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Contact page settings updated successfully!');
    }
}
