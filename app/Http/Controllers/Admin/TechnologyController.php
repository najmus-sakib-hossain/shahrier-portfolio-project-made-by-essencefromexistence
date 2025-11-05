<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::orderBy('order')->get();
        return Inertia::render('dashboard/technologies/index', ['technologies' => $technologies]);
    }

    public function create()
    {
        return Inertia::render('dashboard/technologies/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'category' => 'required|string',
            'proficiency_level' => 'required|string',
            'order' => 'integer',
        ]);

        Technology::create($validated);
        return redirect()->route('admin.technologies.index')->with('success', 'Technology created successfully');
    }

    public function edit(string $id)
    {
        $technology = Technology::findOrFail($id);
        return Inertia::render('dashboard/technologies/edit', ['technology' => $technology]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'category' => 'required|string',
            'proficiency_level' => 'required|string',
            'order' => 'integer',
        ]);

        $technology = Technology::findOrFail($id);
        $technology->update($validated);
        return redirect()->route('admin.technologies.index')->with('success', 'Technology updated successfully');
    }

    public function destroy(string $id)
    {
        Technology::findOrFail($id)->delete();
        return redirect()->route('admin.technologies.index')->with('success', 'Technology deleted successfully');
    }
}
