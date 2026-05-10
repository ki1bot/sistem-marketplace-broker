<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatTransaksi extends Model
{
    protected $table = 'riwayat_transaksi';
    protected $primaryKey = 'id_riwayat';
    public $timestamps = false;

    protected $fillable = [
        'id_transaksi',
        'id_buyer',
        'id_seller',
        'tanggal_riwayat',
        'status_riwayat',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_riwayat' => 'datetime',
    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }

    public function buyer()
    {
        return $this->belongsTo(Buyer::class, 'id_buyer', 'id_buyer');
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'id_seller', 'id_seller');
    }
}
