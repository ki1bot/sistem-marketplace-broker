<?php

use App\Http\Controllers\BrokerController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\KomisiController;
use App\Http\Controllers\NegosiasiController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ProdukTambangController;
use App\Http\Controllers\ProdukNonTambangController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\RiwayatTransaksiController;
use App\Http\Middleware\LogAktivitasMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(LogAktivitasMiddleware::class)->group(function () {
    Route::apiResource('broker', BrokerController::class);
    Route::apiResource('buyer', BuyerController::class);
    Route::apiResource('seller', SellerController::class);
    Route::apiResource('produk', ProdukController::class);
    Route::apiResource('produk-tambang', ProdukTambangController::class);
    Route::apiResource('produk-nontambang', ProdukNonTambangController::class);
    Route::apiResource('transaksi', TransaksiController::class);
    Route::apiResource('negosiasi', NegosiasiController::class);
    Route::apiResource('riwayat-transaksi', RiwayatTransaksiController::class);

    Route::get('komisi', [KomisiController::class, 'index']);
    Route::post('komisi', [KomisiController::class, 'store']);
    Route::get('komisi/{id_transaksi}/{id_komisi}', [KomisiController::class, 'show'])
        ->whereNumber('id_transaksi')
        ->whereNumber('id_komisi');
    Route::put('komisi/{id_transaksi}/{id_komisi}', [KomisiController::class, 'update'])
        ->whereNumber('id_transaksi')
        ->whereNumber('id_komisi');
    Route::patch('komisi/{id_transaksi}/{id_komisi}', [KomisiController::class, 'update'])
        ->whereNumber('id_transaksi')
        ->whereNumber('id_komisi');
    Route::delete('komisi/{id_transaksi}/{id_komisi}', [KomisiController::class, 'destroy'])
        ->whereNumber('id_transaksi')
        ->whereNumber('id_komisi');
});
