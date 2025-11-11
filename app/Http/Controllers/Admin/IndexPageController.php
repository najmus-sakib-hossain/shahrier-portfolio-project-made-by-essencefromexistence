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
            'is_active' => 'nullable|boolean',
        ]);

        // Ensure is_active is boolean
        $validated['is_active'] = $request->has('is_active') ? (bool)$request->is_active : true;

        $indexPage = IndexPageSetting::first();
        
        if (!$indexPage) {
            $indexPage = new IndexPageSetting();
        }

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            // Delete old image if exists and not a default asset
            if ($indexPage->hero_image && 
                !str_starts_with($indexPage->hero_image, '/assets/') && 
                Storage::disk('public')->exists(str_replace('/storage/', '', $indexPage->hero_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $indexPage->hero_image));
            }

            $path = $request->file('hero_image')->store('index-page', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        } else {
            // Don't update hero_image if no new file is uploaded
            unset($validated['hero_image']);
        }

        $indexPage->fill($validated);
        $indexPage->save();

        return redirect()->back()->with('success', 'Index page settings updated successfully!');
    }

    public function storeLogo(Request $request)
    {
        // Log incoming request for debugging
        \Log::info('Logo upload attempt', [
            'has_file' => $request->hasFile('logo_path'),
            'file_info' => $request->hasFile('logo_path') ? [
                'name' => $request->file('logo_path')->getClientOriginalName(),
                'size' => $request->file('logo_path')->getSize(),
                'mime' => $request->file('logo_path')->getMimeType(),
            ] : null,
            'all_data' => $request->except('logo_path'),
        ]);

        // Validate with better error messages
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'logo_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                'display_order' => 'nullable|integer',
                'is_active' => 'nullable',
            ], [
                'name.required' => 'Logo name is required.',
                'logo_path.required' => 'Please select a logo image file.',
                'logo_path.image' => 'The file must be an image.',
                'logo_path.mimes' => 'The logo must be a file of type: jpeg, png, jpg, gif, svg, webp.',
                'logo_path.max' => 'The logo file size must not exceed 5MB.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed for logo upload', [
                'errors' => $e->errors(),
                'request_data' => $request->except('logo_path'),
            ]);
            
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }
            
            throw $e;
        }

        $indexPage = IndexPageSetting::first();
        
        if (!$indexPage) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please configure index page settings first.'
                ], 400);
            }
            return redirect()->back()->with('error', 'Please configure index page settings first.');
        }

        // Ensure is_active is boolean - handle string 'true'/'false' from FormData
        $isActive = $request->input('is_active');
        $validated['is_active'] = $isActive === 'false' || $isActive === false || $isActive === '0' || $isActive === 0 ? false : true;

        // Handle logo upload
        if ($request->hasFile('logo_path')) {
            try {
                $file = $request->file('logo_path');
                
                // Check if file is valid
                if (!$file->isValid()) {
                    \Log::error('Invalid file uploaded', [
                        'error' => $file->getError(),
                        'error_message' => $file->getErrorMessage(),
                    ]);
                    
                    $errorMsg = 'The uploaded file is invalid: ' . $file->getErrorMessage();
                    if ($request->wantsJson() || $request->ajax()) {
                        return response()->json([
                            'success' => false,
                            'message' => $errorMsg,
                            'errors' => ['logo_path' => [$errorMsg]]
                        ], 422);
                    }
                    
                    return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
                }

                // Ensure storage directory exists and is writable
                $storagePath = storage_path('app/public/index-page/logos');
                if (!file_exists($storagePath)) {
                    if (!mkdir($storagePath, 0755, true)) {
                        \Log::error('Failed to create storage directory', [
                            'path' => $storagePath,
                            'parent_writable' => is_writable(dirname($storagePath)),
                        ]);
                        
                        $errorMsg = 'Failed to create storage directory. Please check permissions.';
                        if ($request->wantsJson() || $request->ajax()) {
                            return response()->json([
                                'success' => false,
                                'message' => $errorMsg,
                                'errors' => ['logo_path' => [$errorMsg]]
                            ], 500);
                        }
                        
                        return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
                    }
                }

                // Check if directory is writable
                if (!is_writable($storagePath)) {
                    \Log::error('Storage directory is not writable', [
                        'path' => $storagePath,
                        'permissions' => substr(sprintf('%o', fileperms($storagePath)), -4),
                    ]);
                    
                    $errorMsg = 'Storage directory is not writable. Please set permissions to 755 or 777.';
                    if ($request->wantsJson() || $request->ajax()) {
                        return response()->json([
                            'success' => false,
                            'message' => $errorMsg,
                            'errors' => ['logo_path' => [$errorMsg]]
                        ], 500);
                    }
                    
                    return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
                }

                // Store the file using public_uploads disk (no symlink needed)
                $env = strtolower(config('app.env'));
                $disk = ($env === 'production' || $env === 'prod') ? 'public_uploads' : 'public';
                
                \Log::info('File upload disk selection', [
                    'env' => config('app.env'),
                    'disk' => $disk,
                    'file' => $file->getClientOriginalName(),
                ]);
                
                $path = $file->store('index-page/logos', $disk);
                
                if (!$path) {
                    \Log::error('Failed to store logo file', [
                        'storage_path' => $storagePath,
                        'is_writable' => is_writable($storagePath),
                        'file_name' => $file->getClientOriginalName(),
                        'disk_free_space' => disk_free_space($storagePath),
                        'disk_used' => $disk,
                    ]);
                    
                    $errorMsg = 'Failed to save file. Check storage permissions and disk space.';
                    if ($request->wantsJson() || $request->ajax()) {
                        return response()->json([
                            'success' => false,
                            'message' => $errorMsg,
                            'errors' => ['logo_path' => [$errorMsg]]
                        ], 500);
                    }
                    
                    return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
                }

                // Set file permissions to 644 (readable by everyone)
                $fullPath = $disk === 'public_uploads' 
                    ? public_path('uploads/' . $path)
                    : storage_path('app/public/' . $path);
                    
                if (file_exists($fullPath)) {
                    chmod($fullPath, 0644);
                }

                $validated['logo_path'] = $disk === 'public_uploads' 
                    ? '/uploads/' . $path 
                    : '/storage/' . $path;
            } catch (\Exception $e) {
                \Log::error('Logo upload error: ' . $e->getMessage(), [
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                $errorMsg = 'Upload failed: ' . $e->getMessage();
                if ($request->wantsJson() || $request->ajax()) {
                    return response()->json([
                        'success' => false,
                        'message' => $errorMsg,
                        'errors' => ['logo_path' => [$errorMsg]]
                    ], 500);
                }
                
                return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
            }
        } else {
            $errorMsg = 'No logo file was uploaded.';
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => $errorMsg,
                    'errors' => ['logo_path' => [$errorMsg]]
                ], 422);
            }
            
            return redirect()->back()->withErrors(['logo_path' => $errorMsg]);
        }

        $validated['index_page_setting_id'] = $indexPage->id;
        
        if (!isset($validated['display_order']) || $validated['display_order'] == 0) {
            $maxOrder = IndexPageLogo::where('index_page_setting_id', $indexPage->id)->max('display_order');
            $validated['display_order'] = ($maxOrder ?? 0) + 1;
        }

        $logo = IndexPageLogo::create($validated);

        // Return JSON for AJAX requests
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Logo added successfully!',
                'logo' => $logo
            ]);
        }

        return redirect()->back()->with('success', 'Logo added successfully!');
    }

    public function updateLogo(Request $request, IndexPageLogo $logo)
    {
        // Log incoming request for debugging
        \Log::info('Logo update attempt', [
            'logo_id' => $logo->id,
            'has_file' => $request->hasFile('logo_path'),
            'file_info' => $request->hasFile('logo_path') ? [
                'name' => $request->file('logo_path')->getClientOriginalName(),
                'size' => $request->file('logo_path')->getSize(),
                'mime' => $request->file('logo_path')->getMimeType(),
            ] : null,
            'all_data' => $request->except('logo_path'),
        ]);

        // Validate with better error messages
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'logo_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
                'display_order' => 'nullable|integer',
                'is_active' => 'nullable',
            ], [
                'name.required' => 'Logo name is required.',
                'logo_path.image' => 'The file must be an image.',
                'logo_path.mimes' => 'The logo must be a file of type: jpeg, png, jpg, gif, svg, webp.',
                'logo_path.max' => 'The logo file size must not exceed 5MB.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed for logo update', [
                'errors' => $e->errors(),
                'logo_id' => $logo->id,
                'request_data' => $request->except('logo_path'),
            ]);
            throw $e;
        }

        // Ensure is_active is boolean - handle string 'true'/'false' from FormData
        $isActive = $request->input('is_active');
        $validated['is_active'] = $isActive === 'false' || $isActive === false || $isActive === '0' || $isActive === 0 ? false : ($isActive ? true : $logo->is_active);

        // Handle logo upload
        if ($request->hasFile('logo_path')) {
            try {
                $file = $request->file('logo_path');
                
                // Check if file is valid
                if (!$file->isValid()) {
                    \Log::error('Invalid file uploaded for update', [
                        'error' => $file->getError(),
                        'error_message' => $file->getErrorMessage(),
                        'logo_id' => $logo->id,
                    ]);
                    return redirect()->back()->withErrors([
                        'logo_path' => 'The uploaded file is invalid: ' . $file->getErrorMessage()
                    ]);
                }

                // Ensure storage directory exists and is writable
                $storagePath = storage_path('app/public/index-page/logos');
                if (!file_exists($storagePath)) {
                    if (!mkdir($storagePath, 0755, true)) {
                        \Log::error('Failed to create storage directory for update', [
                            'path' => $storagePath,
                            'parent_writable' => is_writable(dirname($storagePath)),
                            'logo_id' => $logo->id,
                        ]);
                        return redirect()->back()->withErrors([
                            'logo_path' => 'Failed to create storage directory. Please check permissions.'
                        ]);
                    }
                }

                // Check if directory is writable
                if (!is_writable($storagePath)) {
                    \Log::error('Storage directory is not writable for update', [
                        'path' => $storagePath,
                        'permissions' => substr(sprintf('%o', fileperms($storagePath)), -4),
                        'logo_id' => $logo->id,
                    ]);
                    return redirect()->back()->withErrors([
                        'logo_path' => 'Storage directory is not writable. Please set permissions to 755 or 777.'
                    ]);
                }

                // Determine which disk to use
                $env = strtolower(config('app.env'));
                $disk = ($env === 'production' || $env === 'prod') ? 'public_uploads' : 'public';
                
                // Delete old logo if exists
                if ($logo->logo_path) {
                    $oldPath = str_replace(['/storage/', '/uploads/'], '', $logo->logo_path);
                    $oldDisk = str_starts_with($logo->logo_path, '/uploads/') ? 'public_uploads' : 'public';
                    
                    if (Storage::disk($oldDisk)->exists($oldPath)) {
                        Storage::disk($oldDisk)->delete($oldPath);
                    }
                }

                // Store the file
                $path = $file->store('index-page/logos', $disk);
                
                if (!$path) {
                    \Log::error('Failed to store logo file during update', [
                        'storage_path' => $storagePath,
                        'is_writable' => is_writable($storagePath),
                        'file_name' => $file->getClientOriginalName(),
                        'logo_id' => $logo->id,
                        'disk_free_space' => disk_free_space($storagePath),
                        'disk_used' => $disk,
                    ]);
                    return redirect()->back()->withErrors([
                        'logo_path' => 'Failed to save file. Check storage permissions and disk space.'
                    ]);
                }

                // Set file permissions to 644 (readable by everyone)
                $fullPath = $disk === 'public_uploads' 
                    ? public_path('uploads/' . $path)
                    : storage_path('app/public/' . $path);
                    
                if (file_exists($fullPath)) {
                    chmod($fullPath, 0644);
                }

                $validated['logo_path'] = $disk === 'public_uploads' 
                    ? '/uploads/' . $path 
                    : '/storage/' . $path;
            } catch (\Exception $e) {
                \Log::error('Logo update error: ' . $e->getMessage(), [
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'logo_id' => $logo->id,
                ]);
                return redirect()->back()->withErrors([
                    'logo_path' => 'Upload failed: ' . $e->getMessage()
                ]);
            }
        } else {
            // Don't update logo_path if no new file is uploaded
            unset($validated['logo_path']);
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
