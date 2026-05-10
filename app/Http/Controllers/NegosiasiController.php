<?php

namespace App\Http\Controllers;

use App\Models\Negosiasi;
use Illuminate\Http\Request;

class NegosiasiController extends Controller
{
    public function index()
    {
        return response()->json(
            Negosiasi::with('transaksi')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_transaksi' => 'required|exists:transaksi,id_transaksi',
            'tanggal' => 'nullable|date',
            'penawaran_harga' => 'nullable|numeric|min:0',
            'catatan' => 'nullable|string',
        ]);

        $negosiasi = Negosiasi::create($validated);

        return response()->json($negosiasi, 201);
    }

    public function show(int $id)
    {
        $negosiasi = Negosiasi::with('transaksi')->findOrFail($id);

        return response()->json($negosiasi);
    }

    public function update(Request $request, int $id)
    {
        $negosiasi = Negosiasi::findOrFail($id);

        $validated = $request->validate([
            'id_transaksi' => 'sometimes|required|exists:transaksi,id_transaksi',
            'tanggal' => 'nullable|date',
            'penawaran_harga' => 'nullable|numeric|min:0',
            'catatan' => 'nullable|string',
        ]);

        $negosiasi->update($validated);

        return response()->json($negosiasi);
    }

    public function destroy(int $id)
    {
        $negosiasi = Negosiasi::findOrFail($id);
        $negosiasi->delete();

        return response()->json([
            'message' => 'Data negosiasi berhasil dihapus.',
        ]);
    }
}
