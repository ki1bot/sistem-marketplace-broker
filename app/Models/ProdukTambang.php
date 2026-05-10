<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukTambang extends Model
{
    protected $table = 'produk_tambang';
    protected $primaryKey = 'id_produktambang';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id_produktambang',
        'jenis_material',
        'kadar',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produktambang', 'id_produk');
    }
}
