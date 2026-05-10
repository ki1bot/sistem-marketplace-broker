<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Negosiasi extends Model
{
    protected $table = 'negosiasi';
    protected $primaryKey = 'id_negosiasi';
    public $timestamps = false;

    protected $fillable = [
        'id_transaksi',
        'tanggal',
        'penawaran_harga',
        'catatan',
    ];

    protected $casts = [
        'tanggal' => 'datetime',
    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'id_transaksi', 'id_transaksi');
    }
}
