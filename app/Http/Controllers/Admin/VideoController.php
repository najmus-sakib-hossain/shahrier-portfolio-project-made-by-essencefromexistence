<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('publish_date', 'desc')->get();
        return Inertia::render('dashboard/videos/index', ['videos' => $videos]);
    }

    public function create()
    {
        return Inertia::render('dashboard/videos/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'thumbnail' => 'nullable|string',
            'duration' => 'nullable|string',
            'publish_date' => 'required|date',
            'views_count' => 'integer',
            'is_short' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        Video::create($validated);
        return redirect()->route('admin.videos.index')->with('success', 'Video created successfully');
    }

    public function edit(string $id)
    {
        $video = Video::findOrFail($id);
        return Inertia::render('dashboard/videos/edit', ['video' => $video]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'thumbnail' => 'nullable|string',
            'duration' => 'nullable|string',
            'publish_date' => 'required|date',
            'views_count' => 'integer',
            'is_short' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        $video = Video::findOrFail($id);
        $video->update($validated);
        return redirect()->route('admin.videos.index')->with('success', 'Video updated successfully');
    }

    public function destroy(string $id)
    {
        Video::findOrFail($id)->delete();
        return redirect()->route('admin.videos.index')->with('success', 'Video deleted successfully');
    }
}
