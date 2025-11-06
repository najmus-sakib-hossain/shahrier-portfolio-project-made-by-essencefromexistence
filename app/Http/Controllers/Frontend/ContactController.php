<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactPageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
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

        return Inertia::render('Contact/Page/Contact', [
            'settings' => $settings,
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:5000',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Your message has been sent successfully! We will get back to you soon.');
    }
}
