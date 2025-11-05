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
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

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
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.linkedin' => 'nullable|url',
            'social_links.dribbble' => 'nullable|url',
            'social_links.behance' => 'nullable|url',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

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
