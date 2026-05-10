<?php

namespace App\Http\Controllers;

use App\Models\ProdukTambang;
use Illuminate\Http\Request;

class ProdukTambangController extends Controller
{
    public function index()
    {
        return response()->json(
            ProdukTambang::with('produk')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_produktambang' => 'required|exists:produk,id_produk|unique:produk_tambang,id_produktambang',
            'jenis_material' => 'nullable|string|max:100',
            'kadar' => 'nullable|string|max:50',
        ]);

        $produkTambang = ProdukTambang::create($validated);

        return response()->json($produkTambang, 201);
    }

    public function show(int $id)
    {
        $produkTambang = ProdukTambang::with('produk')->findOrFail($id);

        return response()->json($produkTambang);
    }

    public function update(Request $request, int $id)
    {
        $produkTambang = ProdukTambang::findOrFail($id);

        $validated = $request->validate([
            'jenis_material' => 'nullable|string|max:100',
            'kadar' => 'nullable|string|max:50',
        ]);

        $produkTambang->update($validated);

        return response()->json($produkTambang);
    }

    public function destroy(int $id)
    {
        $produkTambang = ProdukTambang::findOrFail($id);
        $produkTambang->delete();

        return response()->json([
            'message' => 'Data produk tambang berhasil dihapus.',
        ]);
    }
}
