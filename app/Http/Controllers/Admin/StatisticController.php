<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatisticController extends Controller
{
    public function index()
    {
        $statistics = Statistic::orderBy('order')->get();
        
        return Inertia::render('dashboard/statistics/index', [
            'statistics' => $statistics
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/statistics/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        Statistic::create($validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic created successfully');
    }

    public function edit(string $id)
    {
        $statistic = Statistic::findOrFail($id);
        
        return Inertia::render('dashboard/statistics/edit', [
            'statistic' => $statistic
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $statistic = Statistic::findOrFail($id);
        $statistic->update($validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic updated successfully');
    }

    public function destroy(string $id)
    {
        $statistic = Statistic::findOrFail($id);
        $statistic->delete();

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Statistic deleted successfully');
    }
}
