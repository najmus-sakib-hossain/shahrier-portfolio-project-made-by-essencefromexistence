<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroSections = HeroSection::orderBy('order')->get();
        
        return Inertia::render('dashboard/hero-sections/index', [
            'heroSections' => $heroSections
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/hero-sections/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'subtitle' => 'required|string',
            'subtitle_max_length' => 'nullable|integer|min:50|max:500',
            'tagline' => 'required|string',
            'tagline_max_length' => 'nullable|integer|min:20|max:100',
            'description' => 'required|string',
            'description_max_length' => 'nullable|integer|min:50|max:300',
            'image_url' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'social_link_settings' => 'nullable|array',
            'social_link_settings.*.platform' => 'required|string',
            'social_link_settings.*.label' => 'required|string|max:50',
            'social_link_settings.*.is_active' => 'boolean',
            'font_settings' => 'nullable|array',
            'font_settings.subtitle_size' => 'nullable|string',
            'font_settings.tagline_size' => 'nullable|string',
            'font_settings.description_size' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        // Validate character limits
        $subtitleMaxLength = $validated['subtitle_max_length'] ?? 200;
        $taglineMaxLength = $validated['tagline_max_length'] ?? 50;
        $descriptionMaxLength = $validated['description_max_length'] ?? 150;

        if (mb_strlen($validated['subtitle']) > $subtitleMaxLength) {
            return redirect()->back()->withErrors([
                'subtitle' => "Subtitle must not exceed {$subtitleMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['tagline']) > $taglineMaxLength) {
            return redirect()->back()->withErrors([
                'tagline' => "Tagline must not exceed {$taglineMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['description']) > $descriptionMaxLength) {
            return redirect()->back()->withErrors([
                'description' => "Description must not exceed {$descriptionMaxLength} characters."
            ])->withInput();
        }

        HeroSection::create($validated);

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $heroSection = HeroSection::findOrFail($id);
        
        return Inertia::render('dashboard/hero-sections/edit', [
            'heroSection' => $heroSection
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'subtitle' => 'required|string',
            'subtitle_max_length' => 'nullable|integer|min:50|max:500',
            'tagline' => 'required|string',
            'tagline_max_length' => 'nullable|integer|min:20|max:100',
            'description' => 'required|string',
            'description_max_length' => 'nullable|integer|min:50|max:300',
            'image_url' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'social_link_settings' => 'nullable|array',
            'social_link_settings.*.platform' => 'required|string',
            'social_link_settings.*.label' => 'required|string|max:50',
            'social_link_settings.*.is_active' => 'boolean',
            'font_settings' => 'nullable|array',
            'font_settings.subtitle_size' => 'nullable|string',
            'font_settings.tagline_size' => 'nullable|string',
            'font_settings.description_size' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        // Validate character limits
        $subtitleMaxLength = $validated['subtitle_max_length'] ?? 200;
        $taglineMaxLength = $validated['tagline_max_length'] ?? 50;
        $descriptionMaxLength = $validated['description_max_length'] ?? 150;

        if (mb_strlen($validated['subtitle']) > $subtitleMaxLength) {
            return redirect()->back()->withErrors([
                'subtitle' => "Subtitle must not exceed {$subtitleMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['tagline']) > $taglineMaxLength) {
            return redirect()->back()->withErrors([
                'tagline' => "Tagline must not exceed {$taglineMaxLength} characters."
            ])->withInput();
        }

        if (mb_strlen($validated['description']) > $descriptionMaxLength) {
            return redirect()->back()->withErrors([
                'description' => "Description must not exceed {$descriptionMaxLength} characters."
            ])->withInput();
        }

        $heroSection = HeroSection::findOrFail($id);
        $heroSection->update($validated);

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $heroSection = HeroSection::findOrFail($id);
        $heroSection->delete();

        return redirect()->route('admin.hero-sections.index')
            ->with('success', 'Hero section deleted successfully');
    }
}
