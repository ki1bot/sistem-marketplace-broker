<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $table = 'seller';
    protected $primaryKey = 'id_seller';
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'perusahaan',
        'kontak',
    ];

    public function produk()
    {
        return $this->hasMany(Produk::class, 'id_seller', 'id_seller');
    }

    public function riwayatTransaksi()
    {
        return $this->hasMany(RiwayatTransaksi::class, 'id_seller', 'id_seller');
    }
}
