<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Award;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AwardController extends Controller
{
    public function index()
    {
        $awards = Award::orderBy('award_date', 'desc')->get();
        return Inertia::render('dashboard/awards/index', ['awards' => $awards]);
    }

    public function create()
    {
        return Inertia::render('dashboard/awards/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'organization' => 'required|string',
            'award_date' => 'required|date',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);

        Award::create($validated);
        return redirect()->route('admin.awards.index')->with('success', 'Award created successfully');
    }

    public function edit(string $id)
    {
        $award = Award::findOrFail($id);
        return Inertia::render('dashboard/awards/edit', ['award' => $award]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'organization' => 'required|string',
            'award_date' => 'required|date',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);

        $award = Award::findOrFail($id);
        $award->update($validated);
        return redirect()->route('admin.awards.index')->with('success', 'Award updated successfully');
    }

    public function destroy(string $id)
    {
        Award::findOrFail($id)->delete();
        return redirect()->route('admin.awards.index')->with('success', 'Award deleted successfully');
    }
}
