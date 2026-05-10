<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = 'produk';
    protected $primaryKey = 'id_produk';
    public $timestamps = false;

    protected $fillable = [
        'nama_produk',
        'jenis',
        'harga_awal',
        'id_seller',
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'id_seller', 'id_seller');
    }

    public function produkTambang()
    {
        return $this->hasOne(ProdukTambang::class, 'id_produktambang', 'id_produk');
    }

    public function produkNonTambang()
    {
        return $this->hasOne(ProdukNonTambang::class, 'id_produknontambang', 'id_produk');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_produk', 'id_produk');
    }
}
