<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::orderBy('order')->get();
        return Inertia::render('dashboard/donations/index', ['donations' => $donations]);
    }

    public function create()
    {
        return Inertia::render('dashboard/donations/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'goal_amount' => 'required|numeric',
            'raised_amount' => 'nullable|numeric',
            'currency' => 'required|string',
            'end_date' => 'required|date',
            'is_active' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        Donation::create($validated);
        return redirect()->route('admin.donations.index')->with('success', 'Donation created successfully');
    }

    public function edit(string $id)
    {
        $donation = Donation::findOrFail($id);
        return Inertia::render('dashboard/donations/edit', ['donation' => $donation]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'goal_amount' => 'required|numeric',
            'raised_amount' => 'nullable|numeric',
            'currency' => 'required|string',
            'end_date' => 'required|date',
            'is_active' => 'boolean',
            'category' => 'required|string',
            'order' => 'integer',
        ]);

        $donation = Donation::findOrFail($id);
        $donation->update($validated);
        return redirect()->route('admin.donations.index')->with('success', 'Donation updated successfully');
    }

    public function destroy(string $id)
    {
        Donation::findOrFail($id)->delete();
        return redirect()->route('admin.donations.index')->with('success', 'Donation deleted successfully');
    }
}
