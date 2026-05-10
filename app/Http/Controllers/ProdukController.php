<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index()
    {
        return response()->json(
            Produk::with(['seller', 'produkTambang', 'produkNonTambang'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_produk' => 'required|string|max:100',
            'jenis' => 'nullable|string|max:50',
            'harga_awal' => 'nullable|numeric|min:0',
            'id_seller' => 'required|exists:seller,id_seller',
        ]);

        $produk = Produk::create($validated);

        return response()->json($produk, 201);
    }

    public function show(int $id)
    {
        $produk = Produk::with(['seller', 'produkTambang', 'produkNonTambang', 'transaksi'])->findOrFail($id);

        return response()->json($produk);
    }

    public function update(Request $request, int $id)
    {
        $produk = Produk::findOrFail($id);

        $validated = $request->validate([
            'nama_produk' => 'sometimes|required|string|max:100',
            'jenis' => 'nullable|string|max:50',
            'harga_awal' => 'nullable|numeric|min:0',
            'id_seller' => 'sometimes|required|exists:seller,id_seller',
        ]);

        $produk->update($validated);

        return response()->json($produk);
    }

    public function destroy(int $id)
    {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return response()->json([
            'message' => 'Data produk berhasil dihapus.',
        ]);
    }
}
