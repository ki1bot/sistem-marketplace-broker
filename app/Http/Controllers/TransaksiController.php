<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        return response()->json(
            Transaksi::with(['produk', 'buyer', 'broker', 'negosiasi', 'komisi'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'nullable|date',
            'harga_deal' => 'nullable|numeric|min:0',
            'status' => 'required|in:pending,nego,deal,batal',
            'id_produk' => 'required|exists:produk,id_produk',
            'id_buyer' => 'required|exists:buyer,id_buyer',
            'id_broker' => 'required|exists:broker,id_broker',
        ]);

        $transaksi = Transaksi::create($validated);

        return response()->json($transaksi, 201);
    }

    public function show(int $id)
    {
        $transaksi = Transaksi::with([
            'produk',
            'buyer',
            'broker',
            'negosiasi',
            'komisi',
            'riwayatTransaksi',
        ])->findOrFail($id);

        return response()->json($transaksi);
    }

    public function update(Request $request, int $id)
    {
        $transaksi = Transaksi::findOrFail($id);

        $validated = $request->validate([
            'tanggal' => 'nullable|date',
            'harga_deal' => 'nullable|numeric|min:0',
            'status' => 'sometimes|required|in:pending,nego,deal,batal',
            'id_produk' => 'sometimes|required|exists:produk,id_produk',
            'id_buyer' => 'sometimes|required|exists:buyer,id_buyer',
            'id_broker' => 'sometimes|required|exists:broker,id_broker',
        ]);

        $transaksi->update($validated);

        return response()->json($transaksi);
    }

    public function destroy(int $id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();

        return response()->json([
            'message' => 'Data transaksi berhasil dihapus.',
        ]);
    }
}
