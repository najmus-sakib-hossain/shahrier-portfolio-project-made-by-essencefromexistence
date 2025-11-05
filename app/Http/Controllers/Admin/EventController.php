<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('event_date', 'desc')->get();
        return Inertia::render('dashboard/events/index', ['events' => $events]);
    }

    public function create()
    {
        return Inertia::render('dashboard/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'organizer' => 'nullable|string',
            'is_featured' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        Event::create($validated);
        return redirect()->route('admin.events.index')->with('success', 'Event created successfully');
    }

    public function edit(string $id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('dashboard/events/edit', ['event' => $event]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'organizer' => 'nullable|string',
            'is_featured' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        $event = Event::findOrFail($id);
        $event->update($validated);
        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully');
    }

    public function destroy(string $id)
    {
        Event::findOrFail($id)->delete();
        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully');
    }
}
