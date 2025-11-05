<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return Inertia::render('dashboard/certificates/index', ['certificates' => $certificates]);
    }

    public function create()
    {
        return Inertia::render('dashboard/certificates/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuing_organization' => 'required|string',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'required|string',
            'credential_url' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);

        Certificate::create($validated);
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully');
    }

    public function edit(string $id)
    {
        $certificate = Certificate::findOrFail($id);
        return Inertia::render('dashboard/certificates/edit', ['certificate' => $certificate]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuing_organization' => 'required|string',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'required|string',
            'credential_url' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);

        $certificate = Certificate::findOrFail($id);
        $certificate->update($validated);
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully');
    }

    public function destroy(string $id)
    {
        Certificate::findOrFail($id)->delete();
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully');
    }
}
