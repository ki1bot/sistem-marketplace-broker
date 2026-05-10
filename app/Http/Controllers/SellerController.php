<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function index()
    {
        return response()->json(Seller::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'perusahaan' => 'nullable|string|max:100',
            'kontak' => 'nullable|string|max:100',
        ]);

        $seller = Seller::create($validated);

        return response()->json($seller, 201);
    }

    public function show(int $id)
    {
        $seller = Seller::with(['produk', 'riwayatTransaksi'])->findOrFail($id);

        return response()->json($seller);
    }

    public function update(Request $request, int $id)
    {
        $seller = Seller::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:100',
            'perusahaan' => 'nullable|string|max:100',
            'kontak' => 'nullable|string|max:100',
        ]);

        $seller->update($validated);

        return response()->json($seller);
    }

    public function destroy(int $id)
    {
        $seller = Seller::findOrFail($id);
        $seller->delete();

        return response()->json([
            'message' => 'Data seller berhasil dihapus.',
        ]);
    }
}
