<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::latest()->get();
        
        return Inertia::render('dashboard/books/index', [
            'books' => $books
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/books/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Ensure is_recommended is boolean
        $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : false;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $disk = config('app.env') === 'production' ? 'public_uploads' : 'public';
            $path = $request->file('cover_image')->store('books/covers', $disk);
            
            // Set file permissions to 644 (readable by everyone)
            $fullPath = $disk === 'public_uploads' 
                ? public_path('uploads/' . $path)
                : storage_path('app/public/' . $path);
                
            if (file_exists($fullPath)) {
                chmod($fullPath, 0644);
            }
            
            $validated['cover_image'] = $disk === 'public_uploads' 
                ? '/uploads/' . $path 
                : '/storage/' . $path;
        }

        Book::create($validated);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book added successfully.');
    }

    public function edit(Book $book)
    {
        return Inertia::render('dashboard/books/edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
            'summary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:0|max:5',
            'isbn' => 'nullable|string',
            'read_date' => 'nullable|date',
            'is_recommended' => 'nullable|boolean',
            'order' => 'nullable|integer',
        ]);

        // Ensure is_recommended is boolean
        $validated['is_recommended'] = $request->has('is_recommended') ? (bool)$request->is_recommended : $book->is_recommended;

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $disk = config('app.env') === 'production' ? 'public_uploads' : 'public';
            
            // Delete old image if exists
            if ($book->cover_image) {
                $oldPath = str_replace(['/storage/', '/uploads/'], '', $book->cover_image);
                $oldDisk = str_starts_with($book->cover_image, '/uploads/') ? 'public_uploads' : 'public';
                
                if (Storage::disk($oldDisk)->exists($oldPath)) {
                    Storage::disk($oldDisk)->delete($oldPath);
                }
            }

            $path = $request->file('cover_image')->store('books/covers', $disk);
            
            // Set file permissions to 644 (readable by everyone)
            $fullPath = $disk === 'public_uploads' 
                ? public_path('uploads/' . $path)
                : storage_path('app/public/' . $path);
                
            if (file_exists($fullPath)) {
                chmod($fullPath, 0644);
            }
            
            $validated['cover_image'] = $disk === 'public_uploads' 
                ? '/uploads/' . $path 
                : '/storage/' . $path;
        } else {
            // Don't update cover_image if no new file is uploaded
            unset($validated['cover_image']);
        }

        $book->update($validated);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        // Delete cover image if exists
        if ($book->cover_image && Storage::disk('public')->exists(str_replace('/storage/', '', $book->cover_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $book->cover_image));
        }

        $book->delete();

        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
