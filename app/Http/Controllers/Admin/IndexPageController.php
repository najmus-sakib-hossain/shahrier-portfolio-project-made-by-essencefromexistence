<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IndexPageSetting;
use App\Models\IndexPageLogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IndexPageController extends Controller
{
    public function index()
    {
        $indexPage = IndexPageSetting::with('logos')->first();
        
        if (!$indexPage) {
            $indexPage = IndexPageSetting::create([
                'title_text' => 'SHAHRIAR',
                'hero_image' => '/assets/shahrier.png',
                'button_text' => 'Play Now',
                'button_link' => '/home',
                'is_active' => true,
            ]);
        }

        return Inertia::render('Admin/IndexPage/Index', [
            'indexPage' => $indexPage,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title_text' => 'required|string|max:255',
            'button_text' => 'required|string|max:255',
            'button_link' => 'required|string|max:255',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'is_active' => 'boolean',
        ]);

        $indexPage = IndexPageSetting::first();
        
        if (!$indexPage) {
            $indexPage = new IndexPageSetting();
        }

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            // Delete old image if exists
            if ($indexPage->hero_image && Storage::disk('public')->exists($indexPage->hero_image)) {
                Storage::disk('public')->delete($indexPage->hero_image);
            }

            $path = $request->file('hero_image')->store('index-page', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        }

        $indexPage->fill($validated);
        $indexPage->save();

        return redirect()->back()->with('success', 'Index page settings updated successfully!');
    }

    public function storeLogo(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $indexPage = IndexPageSetting::first();
        
        if (!$indexPage) {
            return redirect()->back()->with('error', 'Please configure index page settings first.');
        }

        // Handle logo upload
        if ($request->hasFile('logo_path')) {
            $path = $request->file('logo_path')->store('index-page/logos', 'public');
            $validated['logo_path'] = '/storage/' . $path;
        }

        $validated['index_page_setting_id'] = $indexPage->id;
        
        if (!isset($validated['display_order'])) {
            $validated['display_order'] = IndexPageLogo::where('index_page_setting_id', $indexPage->id)->max('display_order') + 1;
        }

        IndexPageLogo::create($validated);

        return redirect()->back()->with('success', 'Logo added successfully!');
    }

    public function updateLogo(Request $request, IndexPageLogo $logo)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo_path')) {
            // Delete old logo if exists
            if ($logo->logo_path && Storage::disk('public')->exists(str_replace('/storage/', '', $logo->logo_path))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $logo->logo_path));
            }

            $path = $request->file('logo_path')->store('index-page/logos', 'public');
            $validated['logo_path'] = '/storage/' . $path;
        }

        $logo->update($validated);

        return redirect()->back()->with('success', 'Logo updated successfully!');
    }

    public function deleteLogo(IndexPageLogo $logo)
    {
        // Delete logo file if exists
        if ($logo->logo_path && Storage::disk('public')->exists(str_replace('/storage/', '', $logo->logo_path))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $logo->logo_path));
        }

        $logo->delete();

        return redirect()->back()->with('success', 'Logo deleted successfully!');
    }

    public function reorderLogos(Request $request)
    {
        $validated = $request->validate([
            'logos' => 'required|array',
            'logos.*.id' => 'required|exists:index_page_logos,id',
            'logos.*.display_order' => 'required|integer',
        ]);

        foreach ($validated['logos'] as $logoData) {
            IndexPageLogo::where('id', $logoData['id'])
                ->update(['display_order' => $logoData['display_order']]);
        }

        return redirect()->back()->with('success', 'Logos reordered successfully!');
    }
}
