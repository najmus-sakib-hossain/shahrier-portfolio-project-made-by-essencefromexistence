<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutSectionController extends Controller
{
    public function index()
    {
        $aboutSections = AboutSection::orderBy('order')->get();
        return Inertia::render('dashboard/about-sections/index', ['aboutSections' => $aboutSections]);
    }

    public function create()
    {
        return Inertia::render('dashboard/about-sections/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'additional_data' => 'nullable|json',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        AboutSection::create($validated);
        return redirect()->route('admin.about-sections.index')->with('success', 'About section created successfully');
    }

    public function edit(string $id)
    {
        $aboutSection = AboutSection::findOrFail($id);
        return Inertia::render('dashboard/about-sections/edit', ['aboutSection' => $aboutSection]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'additional_data' => 'nullable|json',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $aboutSection = AboutSection::findOrFail($id);
        $aboutSection->update($validated);
        return redirect()->route('admin.about-sections.index')->with('success', 'About section updated successfully');
    }

    public function destroy(string $id)
    {
        AboutSection::findOrFail($id)->delete();
        return redirect()->route('admin.about-sections.index')->with('success', 'About section deleted successfully');
    }
}
