<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use Illuminate\Http\Request;

class BuyerController extends Controller
{
    public function index()
    {
        return response()->json(Buyer::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'perusahaan' => 'nullable|string|max:100',
            'kontak' => 'nullable|string|max:100',
        ]);

        $buyer = Buyer::create($validated);

        return response()->json($buyer, 201);
    }

    public function show(int $id)
    {
        $buyer = Buyer::with(['transaksi', 'riwayatTransaksi'])->findOrFail($id);

        return response()->json($buyer);
    }

    public function update(Request $request, int $id)
    {
        $buyer = Buyer::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:100',
            'perusahaan' => 'nullable|string|max:100',
            'kontak' => 'nullable|string|max:100',
        ]);

        $buyer->update($validated);

        return response()->json($buyer);
    }

    public function destroy(int $id)
    {
        $buyer = Buyer::findOrFail($id);
        $buyer->delete();

        return response()->json([
            'message' => 'Data buyer berhasil dihapus.',
        ]);
    }
}
