<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KomisiController extends Controller
{
    public function index()
    {
        $komisi = DB::table('komisi')
            ->join('transaksi', 'komisi.id_transaksi', '=', 'transaksi.id_transaksi')
            ->select('komisi.*', 'transaksi.status as status_transaksi')
            ->get();

        return response()->json($komisi);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_komisi' => 'required|integer',
            'id_transaksi' => 'required|exists:transaksi,id_transaksi',
            'persentase' => 'nullable|numeric|min:0|max:100',
            'jumlah' => 'nullable|numeric|min:0',
        ]);

        $exists = DB::table('komisi')
            ->where('id_transaksi', $validated['id_transaksi'])
            ->where('id_komisi', $validated['id_komisi'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Data komisi dengan id_transaksi dan id_komisi tersebut sudah ada.',
            ], 409);
        }

        DB::table('komisi')->insert($validated);

        return response()->json($validated, 201);
    }

    public function show(int $id_transaksi, int $id_komisi)
    {
        $komisi = DB::table('komisi')
            ->where('id_transaksi', $id_transaksi)
            ->where('id_komisi', $id_komisi)
            ->first();

        if (!$komisi) {
            return response()->json([
                'message' => 'Data komisi tidak ditemukan.',
            ], 404);
        }

        return response()->json($komisi);
    }

    public function update(Request $request, int $id_transaksi, int $id_komisi)
    {
        $validated = $request->validate([
            'persentase' => 'nullable|numeric|min:0|max:100',
            'jumlah' => 'nullable|numeric|min:0',
        ]);

        $updated = DB::table('komisi')
            ->where('id_transaksi', $id_transaksi)
            ->where('id_komisi', $id_komisi)
            ->update($validated);

        if ($updated === 0) {
            return response()->json([
                'message' => 'Data komisi tidak ditemukan atau tidak ada perubahan data.',
            ], 404);
        }

        $komisi = DB::table('komisi')
            ->where('id_transaksi', $id_transaksi)
            ->where('id_komisi', $id_komisi)
            ->first();

        return response()->json($komisi);
    }

    public function destroy(int $id_transaksi, int $id_komisi)
    {
        $deleted = DB::table('komisi')
            ->where('id_transaksi', $id_transaksi)
            ->where('id_komisi', $id_komisi)
            ->delete();

        if ($deleted === 0) {
            return response()->json([
                'message' => 'Data komisi tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Data komisi berhasil dihapus.',
        ]);
    }
}
