<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';
    protected $primaryKey = 'id_transaksi';
    public $timestamps = false;

    protected $fillable = [
        'tanggal',
        'harga_deal',
        'status',
        'id_produk',
        'id_buyer',
        'id_broker',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk', 'id_produk');
    }

    public function buyer()
    {
        return $this->belongsTo(Buyer::class, 'id_buyer', 'id_buyer');
    }

    public function broker()
    {
        return $this->belongsTo(Broker::class, 'id_broker', 'id_broker');
    }

    public function negosiasi()
    {
        return $this->hasMany(Negosiasi::class, 'id_transaksi', 'id_transaksi');
    }

    public function komisi()
    {
        return $this->hasMany(Komisi::class, 'id_transaksi', 'id_transaksi');
    }

    public function riwayatTransaksi()
    {
        return $this->hasMany(RiwayatTransaksi::class, 'id_transaksi', 'id_transaksi');
    }
}
