<?php

namespace App\Http\Controllers;

use App\Models\RiwayatTransaksi;
use Illuminate\Http\Request;

class RiwayatTransaksiController extends Controller
{
    public function index()
    {
        return response()->json(
            RiwayatTransaksi::with(['transaksi', 'buyer', 'seller'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_transaksi' => 'required|exists:transaksi,id_transaksi',
            'id_buyer' => 'required|exists:buyer,id_buyer',
            'id_seller' => 'required|exists:seller,id_seller',
            'tanggal_riwayat' => 'nullable|date',
            'status_riwayat' => 'required|in:pending,nego,deal,batal,dibayar,selesai',
            'keterangan' => 'nullable|string',
        ]);

        $riwayat = RiwayatTransaksi::create($validated);

        return response()->json($riwayat, 201);
    }

    public function show(int $id)
    {
        $riwayat = RiwayatTransaksi::with(['transaksi', 'buyer', 'seller'])->findOrFail($id);

        return response()->json($riwayat);
    }

    public function update(Request $request, int $id)
    {
        $riwayat = RiwayatTransaksi::findOrFail($id);

        $validated = $request->validate([
            'id_transaksi' => 'sometimes|required|exists:transaksi,id_transaksi',
            'id_buyer' => 'sometimes|required|exists:buyer,id_buyer',
            'id_seller' => 'sometimes|required|exists:seller,id_seller',
            'tanggal_riwayat' => 'nullable|date',
            'status_riwayat' => 'sometimes|required|in:pending,nego,deal,batal,dibayar,selesai',
            'keterangan' => 'nullable|string',
        ]);

        $riwayat->update($validated);

        return response()->json($riwayat);
    }

    public function destroy(int $id)
    {
        $riwayat = RiwayatTransaksi::findOrFail($id);
        $riwayat->delete();

        return response()->json([
            'message' => 'Data riwayat transaksi berhasil dihapus.',
        ]);
    }
}
