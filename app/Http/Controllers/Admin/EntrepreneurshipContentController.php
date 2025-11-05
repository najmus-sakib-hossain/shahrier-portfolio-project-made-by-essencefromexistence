<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EntrepreneurshipContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntrepreneurshipContentController extends Controller
{
    public function index()
    {
        $content = EntrepreneurshipContent::orderBy('publish_date', 'desc')->get();
        return Inertia::render('dashboard/entrepreneurship-content/index', ['content' => $content]);
    }

    public function create()
    {
        return Inertia::render('dashboard/entrepreneurship-content/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string',
            'publish_date' => 'required|date',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        EntrepreneurshipContent::create($validated);
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content created successfully');
    }

    public function edit(string $id)
    {
        $content = EntrepreneurshipContent::findOrFail($id);
        return Inertia::render('dashboard/entrepreneurship-content/edit', ['content' => $content]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string',
            'publish_date' => 'required|date',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $content = EntrepreneurshipContent::findOrFail($id);
        $content->update($validated);
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content updated successfully');
    }

    public function destroy(string $id)
    {
        EntrepreneurshipContent::findOrFail($id)->delete();
        return redirect()->route('admin.entrepreneurship-content.index')->with('success', 'Content deleted successfully');
    }
}
