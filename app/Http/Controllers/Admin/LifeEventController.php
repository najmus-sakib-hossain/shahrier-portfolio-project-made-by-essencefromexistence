<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LifeEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LifeEventController extends Controller
{
    public function index()
    {
        $lifeEvents = LifeEvent::orderBy('event_date', 'desc')->get();
        return Inertia::render('dashboard/life-events/index', ['lifeEvents' => $lifeEvents]);
    }

    public function create()
    {
        return Inertia::render('dashboard/life-events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'event_date' => 'required|date',
            'category' => 'required|string',
            'location' => 'required|string',
            'order' => 'integer',
        ]);

        LifeEvent::create($validated);
        return redirect()->route('admin.life-events.index')->with('success', 'Life event created successfully');
    }

    public function edit(string $id)
    {
        $lifeEvent = LifeEvent::findOrFail($id);
        return Inertia::render('dashboard/life-events/edit', ['lifeEvent' => $lifeEvent]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'event_date' => 'required|date',
            'category' => 'required|string',
            'location' => 'required|string',
            'order' => 'integer',
        ]);

        $lifeEvent = LifeEvent::findOrFail($id);
        $lifeEvent->update($validated);
        return redirect()->route('admin.life-events.index')->with('success', 'Life event updated successfully');
    }

    public function destroy(string $id)
    {
        LifeEvent::findOrFail($id)->delete();
        return redirect()->route('admin.life-events.index')->with('success', 'Life event deleted successfully');
    }
}
