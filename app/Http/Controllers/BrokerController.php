<?php

namespace App\Http\Controllers;

use App\Models\Broker;
use Illuminate\Http\Request;

class BrokerController extends Controller
{
    public function index()
    {
        return response()->json(
            Broker::with(['senior', 'junior'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'tingkatan' => 'required|in:junior,senior',
            'id_broker_senior' => 'nullable|exists:broker,id_broker',
        ]);

        $broker = Broker::create($validated);

        return response()->json($broker, 201);
    }

    public function show(int $id)
    {
        $broker = Broker::with(['senior', 'junior', 'transaksi'])->findOrFail($id);

        return response()->json($broker);
    }

    public function update(Request $request, int $id)
    {
        $broker = Broker::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:100',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'tingkatan' => 'sometimes|required|in:junior,senior',
            'id_broker_senior' => 'nullable|exists:broker,id_broker',
        ]);

        $broker->update($validated);

        return response()->json($broker);
    }

    public function destroy(int $id)
    {
        $broker = Broker::findOrFail($id);
        $broker->delete();

        return response()->json([
            'message' => 'Data broker berhasil dihapus.',
        ]);
    }
}
