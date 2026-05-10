<?php

namespace App\Http\Controllers;

use App\Models\ProdukNonTambang;
use Illuminate\Http\Request;

class ProdukNonTambangController extends Controller
{
    public function index()
    {
        return response()->json(
            ProdukNonTambang::with('produk')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_produknontambang' => 'required|exists:produk,id_produk|unique:produk_nontambang,id_produknontambang',
            'kategori' => 'nullable|string|max:100',
        ]);

        $produkNonTambang = ProdukNonTambang::create($validated);

        return response()->json($produkNonTambang, 201);
    }

    public function show(int $id)
    {
        $produkNonTambang = ProdukNonTambang::with('produk')->findOrFail($id);

        return response()->json($produkNonTambang);
    }

    public function update(Request $request, int $id)
    {
        $produkNonTambang = ProdukNonTambang::findOrFail($id);

        $validated = $request->validate([
            'kategori' => 'nullable|string|max:100',
        ]);

        $produkNonTambang->update($validated);

        return response()->json($produkNonTambang);
    }

    public function destroy(int $id)
    {
        $produkNonTambang = ProdukNonTambang::findOrFail($id);
        $produkNonTambang->delete();

        return response()->json([
            'message' => 'Data produk non tambang berhasil dihapus.',
        ]);
    }
}
