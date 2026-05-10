<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    protected $table = 'buyer';
    protected $primaryKey = 'id_buyer';
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'perusahaan',
        'kontak',
    ];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_buyer', 'id_buyer');
    }

    public function riwayatTransaksi()
    {
        return $this->hasMany(RiwayatTransaksi::class, 'id_buyer', 'id_buyer');
    }
}
